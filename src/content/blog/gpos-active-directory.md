---
title: "GPOs en Active Directory: estructura, delegación y buenas prácticas"
description: "Guía práctica para diseñar una jerarquía de GPOs escalable, aplicar delegación por OU y evitar los errores más comunes en entornos Windows Server."
date: 2024-12-03
tags: ["Active Directory", "GPOs", "Windows Server", "Sysadmin"]
draft: false
---

Las Group Policy Objects son uno de los mecanismos más potentes de Active Directory y, a la vez, uno de los más fáciles de convertir en un desastre. He visto entornos con 200 GPOs donde nadie sabe qué hace cada una, con herencias rotas y objetos desvinculados que llevan años sin aplicarse. Este artículo describe el enfoque que aplico para mantener una estructura manejable.

## Cómo funciona la herencia (LSDOU)

Antes de crear cualquier GPO conviene entender el orden de aplicación. Active Directory procesa las políticas en este orden:

1. **L**ocal — políticas locales del equipo
2. **S**ite — vinculadas al sitio de AD
3. **D**omain — vinculadas al dominio raíz
4. **O**U — vinculadas a la OU, de la más alta a la más específica

Las GPOs de nivel más específico sobreescriben las de nivel superior, a menos que actives **Enforced** (antes llamado No Override). Con Enforced, la GPO marcada no puede ser sobreescrita por ninguna OU hija.

Si una OU tiene **Block Inheritance**, no recibe las GPOs de niveles superiores — excepto las marcadas como Enforced.

Mezclar Block Inheritance y Enforced sin criterio es la receta para el caos. Úsalos con moderación y documenta por qué.

## Estructura de OUs recomendada

La jerarquía de OUs define cómo aplicas las GPOs. Una estructura que funciona bien en entornos de 50–500 usuarios:

```
dominio.local
├── _Administracion        (cuentas de admin, sin GPOs de usuario)
├── Equipos
│   ├── Servidores
│   ├── Escritorios
│   │   ├── Sede-Madrid
│   │   └── Sede-Barcelona
│   └── Portátiles
├── Usuarios
│   ├── Gerencia
│   ├── IT
│   ├── Ventas
│   └── Externo
└── Grupos
    ├── Seguridad
    └── Distribucion
```

Los equipos y los usuarios en OUs separadas permite aplicar políticas distintas a cada tipo de objeto sin necesidad de filtros WMI o loopback.

## Nombrado consistente

Sin una convención de nombres, el listado de GPOs se convierte en ininteligible. Mi formato:

```
[SCOPE]-[TIPO]-[Descripcion]

Ejemplos:
DOM-SEC-PasswordPolicy
DOM-SEC-AuditPolicy
EQ-CFG-WindowsUpdate
EQ-SEC-FirewallBaseline
EQ-SEC-BitLockerEscritorios
US-CFG-MapUnidades-Ventas
US-CFG-Impresoras-Madrid
US-SEC-RestringirPanelControl
```

- `DOM` = vinculada al dominio
- `EQ` = aplica a equipos
- `US` = aplica a usuarios
- `SEC` = seguridad
- `CFG` = configuración

## Gestión con PowerShell

Para entornos donde manejas muchas GPOs, PowerShell es imprescindible. El módulo `GroupPolicy` viene instalado con RSAT.

**Listar todas las GPOs del dominio:**
```powershell
Get-GPO -All | Select-Object DisplayName, GpoStatus, CreationTime, ModificationTime |
  Sort-Object ModificationTime -Descending |
  Format-Table -AutoSize
```

**Crear y vincular una GPO:**
```powershell
# Crear la GPO
$gpo = New-GPO -Name "EQ-SEC-FirewallBaseline" -Domain "dominio.local"

# Vincularla a una OU
New-GPLink -Name "EQ-SEC-FirewallBaseline" `
           -Target "OU=Escritorios,OU=Equipos,DC=dominio,DC=local" `
           -LinkEnabled Yes

# Forzar orden (si hay varias GPOs en la misma OU, el número más bajo tiene prioridad)
Set-GPLink -Name "EQ-SEC-FirewallBaseline" `
           -Target "OU=Escritorios,OU=Equipos,DC=dominio,DC=local" `
           -Order 1
```

**Hacer backup de todas las GPOs:**
```powershell
$fecha = Get-Date -Format 'yyyy-MM-dd'
Backup-GPO -All -Path "\\servidor\backups\GPOs\$fecha"
```

**Importar una GPO desde backup (útil para replicar config entre entornos):**
```powershell
Import-GPO -BackupGpoName "EQ-SEC-FirewallBaseline" `
           -Path "\\servidor\backups\GPOs\2024-12-01" `
           -TargetName "EQ-SEC-FirewallBaseline" `
           -CreateIfNeeded
```

## Loopback Processing

Por defecto, las GPOs de usuario se aplican según la OU donde está el objeto de usuario. Loopback Processing invierte esto: aplica las GPOs de usuario de la OU donde está el **equipo**.

Es útil para equipos compartidos (quioscos, salas de reuniones, terminales de producción) donde quieres que la configuración del usuario dependa del equipo, no del usuario.

```
Computer Configuration
└── Policies
    └── Administrative Templates
        └── System
            └── Group Policy
                └── Configure user Group Policy loopback processing mode
                    → Enabled
                    → Mode: Replace (aplica solo las GPOs del equipo, ignora las del usuario)
                           Merge (aplica ambas, el equipo tiene prioridad)
```

`Replace` para quioscos. `Merge` cuando quieres añadir restricciones al usuario sin perder sus propias GPOs.

## Filtros WMI

Los filtros WMI permiten condicionar la aplicación de una GPO a características del equipo. Son potentes pero tienen coste de rendimiento en el login/startup porque el cliente debe evaluar la query WMI.

**Ejemplos útiles:**

Solo equipos con Windows 11:
```sql
SELECT * FROM Win32_OperatingSystem WHERE Version LIKE "10.0.2%" AND ProductType = "1"
```

Solo portátiles (equipos con batería):
```sql
SELECT * FROM Win32_Battery WHERE Availability = 2
```

Solo equipos con más de 8 GB de RAM:
```sql
SELECT * FROM Win32_ComputerSystem WHERE TotalPhysicalMemory >= 8589934592
```

Aplica los filtros WMI con moderación. Si puedes conseguir lo mismo con OUs separadas, usa OUs — es más predecible y no añade latencia al arranque.

## Troubleshooting

**Ver las GPOs aplicadas en un equipo:**
```powershell
# En el equipo local
gpresult /r

# Salida HTML detallada (abre en el navegador)
gpresult /h C:\Temp\gpresult.html /f

# Para otro equipo y usuario desde un admin remoto
gpresult /s NOMBRE-PC /u dominio\usuario /r
```

**Forzar actualización inmediata:**
```powershell
# Local
gpupdate /force

# Remoto (requiere WinRM activo)
Invoke-GPUpdate -Computer "NOMBRE-PC" -Force
```

**Ver el Resultant Set of Policy en GPMC:**

Abre `gpmc.msc` → click derecho en **Group Policy Results** → Group Policy Results Wizard. Selecciona el equipo y el usuario. Te muestra exactamente qué GPOs se aplicaron, cuáles se filtraron y por qué.

Es la herramienta definitiva para depurar: puedes ver si una GPO fue denegada por permisos, filtrada por WMI, o simplemente no vinculada a la OU correcta.

## Buenas prácticas resumidas

- **Una GPO, un propósito.** Divide `EQ-SEC-Firewall` y `EQ-SEC-BitLocker` en lugar de meter todo en una.
- **Nunca edites Default Domain Policy** para nada que no sea contraseñas y bloqueo de cuenta. El resto, GPOs dedicadas.
- **Documenta el propósito** en la descripción de cada GPO (campo Description en GPMC).
- **Backup automatizado** antes de cualquier cambio en producción.
- **Prueba en una OU de test** antes de vincular a producción.
- **Deshabilita la parte no usada** de cada GPO (si solo configuras Computer, deshabilita User Configuration) — reduce el tiempo de procesamiento.

Una estructura de GPOs bien diseñada es casi invisible: las configuraciones llegan, los usuarios no se quejan y tú no recibes tickets de "mi escritorio cambió solo".
