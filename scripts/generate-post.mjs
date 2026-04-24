import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';

// Temas rotativos — se selecciona uno por mes/año de forma determinista
const TOPICS = [
  'Automatización de tareas repetitivas con Ansible en entornos mixtos Windows/Linux',
  'Monitorización proactiva con Zabbix: triggers, escalaciones y notificaciones por canal',
  'Hardening de servidores Linux: checklist completo con ejemplos aplicables en producción',
  'Docker en producción: gestión de secretos, healthchecks y estrategias de despliegue cero downtime',
  'PowerShell para administradores: automatización avanzada y remoting sobre WinRM',
  'Certificados TLS gestionados automáticamente con Caddy y Let\'s Encrypt en self-hosted',
  'Centralización de logs con el stack ELK: arquitectura, ingestión y casos de uso reales',
  'Backup empresarial con Veeam: estrategia 3-2-1, jobs automatizados y verificación de restauración',
  'Zero Trust Network Access: implementación práctica para infraestructuras medianas',
  'PostgreSQL en producción: replicación streaming, backups con pg_basebackup y monitorización',
  'Active Directory: grupos anidados, delegación avanzada y auditoría de cambios con PowerShell',
  'Infraestructura como código con Terraform: módulos, estado remoto y pipelines de validación',
  'Seguridad en Kubernetes: RBAC, network policies, Pod Security Admission y scanning de imágenes',
  'Aprovisionamiento automático de VMs en Proxmox con cloud-init y scripts de post-instalación',
  'SIEM con Wazuh: detección de amenazas, reglas personalizadas y correlación de eventos',
  'Gestión de contraseñas y secretos en infraestructura: Passbolt, Vault y buenas prácticas',
  'Alta disponibilidad con HAProxy y Keepalived: configuración y failover automático',
  'Automatización de inventario IT con Snipe-IT y scripts de sincronización con Active Directory',
];

function getTopicForDate(date) {
  // Índice único por mes y año para evitar repetición en años consecutivos
  const index = (date.getFullYear() * 12 + date.getMonth()) % TOPICS.length;
  return TOPICS[index];
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('❌  ANTHROPIC_API_KEY no está definida');
    process.exit(1);
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const isoDate = `${year}-${month}-01`;
  const filename = `${year}-${month}-post.md`;
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const outputPath = path.join(blogDir, filename);

  if (fs.existsSync(outputPath)) {
    console.log(`ℹ️   El artículo de ${year}-${month} ya existe, nada que hacer.`);
    process.exit(0);
  }

  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  const topic = getTopicForDate(now);
  console.log(`📝  Tema seleccionado: ${topic}`);
  console.log(`📅  Fecha del artículo: ${isoDate}`);

  const client = new Anthropic({ apiKey });

  const prompt = `Eres un sysadmin senior con más de 10 años de experiencia en administración de sistemas, infraestructura IT, redes y seguridad. Escribe un artículo técnico profesional en español sobre el siguiente tema:

TEMA: ${topic}

INSTRUCCIONES CRÍTICAS DE FORMATO:
- Responde ÚNICAMENTE con el contenido del archivo Markdown completo
- No añadas texto antes ni después del archivo
- No envuelvas la respuesta en bloques de código (\`\`\`markdown, \`\`\`, etc.)
- El archivo debe comenzar DIRECTAMENTE con los tres guiones del frontmatter

FRONTMATTER OBLIGATORIO (exactamente este formato YAML):
---
title: "título descriptivo y específico del artículo"
description: "descripción concisa de 1-2 frases que resuma el valor del artículo"
date: ${isoDate}
tags: ["Tag1", "Tag2", "Tag3", "Tag4"]
draft: false
---

REQUISITOS DEL CONTENIDO:
- Entre 700 y 900 palabras de contenido técnico real, sin relleno
- Al menos 2 bloques de código con ejemplos funcionales (bash, yaml, powershell, python, etc.)
- Estructura con secciones ## y subsecciones ### donde aporte claridad
- Orientado a sysadmins con experiencia intermedia-avanzada
- Contexto de producción real: entornos empresariales, casos concretos, errores comunes
- Español técnico y directo, sin formulismos innecesarios
- Terminar con una sección de conclusión o resumen práctico`;

  console.log('🤖  Llamando a la API de Anthropic...');

  const message = await client.messages.create({
    model: 'claude-opus-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  let content = message.content[0]?.type === 'text' ? message.content[0].text.trim() : '';

  // Eliminar bloque de código si el modelo lo envolvió igualmente
  content = content.replace(/^```(?:markdown|md)?\n/, '').replace(/\n```\s*$/, '').trim();

  if (!content.startsWith('---')) {
    console.error('❌  El contenido generado no tiene el frontmatter esperado.');
    console.error('    Primeros 300 caracteres:', content.slice(0, 300));
    process.exit(1);
  }

  fs.writeFileSync(outputPath, content + '\n', 'utf-8');

  console.log(`✅  Artículo guardado en: ${outputPath}`);
  console.log(`    Tokens: ${message.usage.input_tokens} entrada / ${message.usage.output_tokens} salida`);
}

main().catch((err) => {
  console.error('❌  Error inesperado:', err.message ?? err);
  process.exit(1);
});
