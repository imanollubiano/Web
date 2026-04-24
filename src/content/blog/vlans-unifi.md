---
title: "Segmentación de red con VLANs en UniFi: diseño práctico para entornos empresariales"
description: "Cómo diseñar e implementar VLANs con UniFi Network para aislar tráfico, mejorar seguridad y facilitar la gestión en redes corporativas."
date: 2024-11-15
tags: ["Redes", "UniFi", "VLANs", "Seguridad"]
draft: false
---

La segmentación de red es una de las decisiones de arquitectura con mayor impacto en seguridad y rendimiento. Sin embargo, en muchos entornos medianos se ignora hasta que ocurre un incidente. Este artículo documenta el proceso de diseño e implementación de VLANs con UniFi Network que he aplicado en entornos reales.

## Por qué segmentar

Una red plana donde todos los dispositivos comparten el mismo broadcast domain tiene varios problemas:

- Un equipo comprometido puede hacer reconocimiento lateral sin restricciones
- El tráfico de IoT (impresoras, cámaras, sensores) comparte segmento con estaciones de trabajo
- No hay forma de aplicar políticas de acceso granulares
- El tráfico de invitados circula junto al tráfico corporativo

Con VLANs cada segmento queda aislado a nivel L2. El enrutamiento entre VLANs solo ocurre donde está explícitamente permitido.

## Diseño de subredes

El primer paso es definir los segmentos antes de tocar el controller. Mi esquema habitual para una empresa pequeña/mediana:

| VLAN ID | Nombre       | Subred           | Propósito                              |
|---------|--------------|------------------|----------------------------------------|
| 1       | Gestión      | 10.0.1.0/24      | Switches, APs, routers, OOB            |
| 10      | Servidores   | 10.0.10.0/24     | Windows Server, Linux, NAS             |
| 20      | Usuarios     | 10.0.20.0/22     | Estaciones de trabajo, laptops         |
| 30      | VoIP         | 10.0.30.0/24     | Teléfonos IP, softphones               |
| 40      | IoT          | 10.0.40.0/24     | Impresoras, cámaras IP, sensores       |
| 99      | Invitados    | 192.168.99.0/24  | WiFi de invitados, aislado de todo     |

La VLAN de gestión (1 o la que elijas) **nunca debe tener acceso DHCP para usuarios finales**. Es el segmento desde donde administras la infraestructura.

## Configuración en UniFi Network

### Crear las redes

En **Settings → Networks**, crear una red por VLAN:

1. **Network Name**: nombre descriptivo (ej. `VLAN-Servidores`)
2. **VLAN ID**: el número de VLAN (10, 20, 30...)
3. **Gateway IP**: primera IP de la subred (ej. `10.0.10.1`)
4. **Subnet**: máscara en CIDR (ej. `/24`)
5. **DHCP**: activar y configurar rango (ej. `10.0.10.100` – `10.0.10.200`)
6. **DHCP DNS**: apuntar al DNS interno si tienes uno (AD, Pi-hole...)

Para la VLAN de gestión, deshabilita DHCP y usa IPs estáticas en todos los dispositivos de red.

### Configurar los switches

En **Devices → Switch → Ports**, cada puerto necesita su perfil:

**Puerto de acceso** (endpoint final como PC o teléfono):
```
Profile Override:
  Native Network: VLAN-Usuarios   (untagged)
  Tagged Networks: ninguna
```

**Puerto trunk** (hacia otro switch, router o servidor con NIC virtual):
```
Profile Override:
  Native Network: Gestión        (untagged)
  Tagged Networks: Servidores, Usuarios, VoIP, IoT, Invitados
```

En UniFi puedes crear **Switch Port Profiles** reutilizables en Settings → Profiles → Switch Port, lo que evita configurar puerto a puerto cuando tienes 48 puertos con el mismo rol.

### WiFi por VLAN

Cada SSID puede vincularse a una VLAN. En **Settings → WiFi**:

- SSID `Corp-WiFi` → Network: `VLAN-Usuarios`
- SSID `VoIP-WiFi` → Network: `VLAN-VoIP`
- SSID `Invitados` → Network: `VLAN-Invitados`, activar **Client Isolation**

El AP transmite cada SSID como una red independiente. El tráfico llega taggeado al switch y el router lo procesa por su VLAN.

## Reglas de firewall inter-VLAN

Por defecto UniFi permite todo el tráfico entre VLANs. Hay que añadir reglas explícitas. En **Settings → Firewall & Security → LAN Firewall**:

**Bloquear acceso desde IoT a cualquier cosa:**
```
Rule: Drop IoT to RFC1918
Action: Drop
Source: VLAN-IoT (10.0.40.0/24)
Destination: IP Group RFC1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
```

**Permitir que servidores inicien conexiones a usuarios (no al revés para ciertos puertos):**
```
Rule: Allow Servers to Users (established)
Action: Accept
Source: VLAN-Servidores
Destination: VLAN-Usuarios
Match state: Established, Related
```

**Bloquear invitados a todo excepto internet:**
```
Rule: Drop Guests to RFC1918
Action: Drop
Source: VLAN-Invitados (192.168.99.0/24)
Destination: IP Group RFC1918
```

El orden de las reglas importa: UniFi las evalúa de arriba hacia abajo y aplica la primera coincidencia.

## Verificación

Una vez desplegado, verifica que el aislamiento funciona:

```bash
# Desde una máquina en VLAN-Usuarios (10.0.20.x)
# Debe fallar (bloqueado por firewall):
ping 10.0.40.1

# Debe funcionar (acceso a servidores permitido):
ping 10.0.10.50

# Desde VLAN-IoT, debe fallar todo excepto internet:
ping 10.0.10.1   # → timeout
curl https://example.com  # → OK
```

En UniFi puedes usar **Network → Insights → Traffic** para ver si el tráfico sigue los caminos esperados, y **Firewall Logs** para confirmar que las reglas drop están actuando.

## Conclusión

La segmentación con VLANs no es solo una medida de seguridad: simplifica enormemente la operación diaria. Cuando un dispositivo IoT empieza a comportarse de forma extraña, está contenido. Cuando añades un nuevo servidor, sabes exactamente en qué segmento va y qué accesos tiene. UniFi hace que implementar todo esto sea razonablemente directo una vez tienes el diseño claro.

Lo más importante es hacer el diseño antes de tocar el controller. Cambiar una VLAN en producción mientras hay usuarios conectados tiene consecuencias.
