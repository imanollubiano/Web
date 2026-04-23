// ── EXPERIENCIA ─────────────────────────────────────────────────────────────
export const experience = [
  {
    company: 'Bodegas Emilio Moro',
    role: 'Técnico de TI',
    period: 'Mar 2026 — Presente',
    location: 'Pesquera de Duero, Castilla y León',
    type: 'Jornada completa · Híbrido',
    current: true,
    description: '',
    tags: [],
  },
  {
    company: 'PackBenefit',
    role: 'IT Manager',
    period: 'Jul 2025 — Feb 2026',
    location: 'Aldeamayor de San Martín, Castilla y León',
    type: 'Jornada completa · Híbrido',
    current: false,
    description:
      'Responsable de la estrategia, operación y evolución de la infraestructura tecnológica corporativa en un entorno multi-sede. Lideré la reestructuración de Active Directory (OUs, GPOs, consolidación de dominios), el diseño de red segmentada /22 con VLANs y WiFi empresarial RADIUS/NPS, y la administración de entornos híbridos Microsoft 365 (Entra ID, Intune, Purview DLP). Gestioné virtualización con Proxmox en clúster y desarrollé un portal B2B on-prem con Next.js, NestJS y PostgreSQL integrado con Navision.',
    tags: ['Windows Server', 'Active Directory', 'Proxmox', 'Entra ID', 'Intune', 'Purview', 'NPS', 'RADIUS', 'Docker', 'PostgreSQL', 'Next.js', 'NestJS', 'Navision'],
  },
  {
    company: 'Keycoes Comunicaciones',
    role: 'Técnico de campo',
    period: 'Abr 2024 — Abr 2025',
    location: 'Valladolid, Castilla y León',
    type: 'Jornada completa · Presencial',
    current: false,
    description:
      'Soporte técnico especializado en infraestructuras IT y comunicaciones para clientes empresariales. Instalación y mantenimiento de redes LAN/WAN, resolución avanzada de incidencias en hardware, software y conectividad, despliegue de sistemas operativos y servidores en entornos cliente. Intervenciones técnicas in situ y en remoto garantizando continuidad operativa.',
    tags: ['Redes LAN/WAN', 'Windows', 'Soporte remoto', 'Instalación hardware'],
  },
  {
    company: 'Cetelem',
    role: 'Técnico de TI',
    period: 'Ago 2023 — Sep 2023',
    location: 'Valladolid, Castilla y León',
    type: 'Contrato temporal · Presencial',
    current: false,
    description:
      'Soporte IT en el proyecto corporativo IRIUM: asistencia técnica presencial y remota a usuarios de la plataforma financiera, mantenimiento y configuración de equipos, y garantía de continuidad operativa en entorno corporativo.',
    tags: ['Soporte técnico', 'ITIL'],
  },
];

// ── PUBLICACIONES LINKEDIN ───────────────────────────────────────────────────
// Añade aquí los posts de LinkedIn que quieras destacar.
// href: la URL directa del post (clic derecho en el post → Copiar enlace).
export const posts = [
  {
    title: 'Título de tu publicación destacada',
    excerpt:
      'Primer párrafo o frase clave del post. Lo que engancha al lector a querer verlo en LinkedIn.',
    date: 'Mar 2025',
    href: 'https://www.linkedin.com/in/imanol-lubiano-428039279/',
    reactions: 0,
  },
  {
    title: 'Segunda publicación que quieras mostrar',
    excerpt:
      'Otro extracto representativo. Puede ser un aprendizaje técnico, un proyecto compartido, una reflexión.',
    date: 'Ene 2025',
    href: 'https://www.linkedin.com/in/imanol-lubiano-428039279/',
    reactions: 0,
  },
];

// ── MARQUEE ──────────────────────────────────────────────────────────────────
export const marquee = [
  { name: 'Microsoft',       logo: '/images/logos/microsoft.svg',       href: 'https://microsoft.com' },
  { name: 'Azure',           logo: '/images/logos/azure.svg',           href: 'https://azure.microsoft.com' },
  { name: 'Intune',          logo: '/images/logos/intune.svg',          href: 'https://microsoft.com/intune' },
  { name: 'Hyper-V',        logo: '/images/logos/hyperv.svg',          href: 'https://microsoft.com' },
  { name: 'Dell',            logo: '/images/logos/dell.svg',            href: 'https://dell.com' },
  { name: 'HP',              logo: '/images/logos/hp.svg',              href: 'https://hp.com' },
  { name: 'HPE',             logo: '/images/logos/hpe.svg',             href: 'https://hpe.com' },
  { name: 'Lenovo',          logo: '/images/logos/lenovo.svg',          href: 'https://lenovo.com' },
  { name: 'ASUS',            logo: '/images/logos/asus.svg',            href: 'https://asus.com' },
  { name: 'Logitech',        logo: '/images/logos/logitech.svg',        href: 'https://logitech.com' },
  { name: 'Ubiquiti',        logo: '/images/logos/ubiquiti.svg',        href: 'https://ui.com' },
  { name: 'Cisco',           logo: '/images/logos/cisco.svg',           href: 'https://cisco.com' },
  { name: 'Aruba',           logo: '/images/logos/aruba.svg',           href: 'https://arubanetworks.com' },
  { name: 'Proxmox',         logo: '/images/logos/proxmox.svg',         href: 'https://proxmox.com' },
  { name: 'VMware',          logo: '/images/logos/vmware.svg',          href: 'https://vmware.com' },
  { name: 'Docker',          logo: '/images/logos/docker.svg',          href: 'https://docker.com' },
  { name: 'Linux',           logo: '/images/logos/linux.svg',           href: 'https://kernel.org' },
  { name: 'Veeam',           logo: '/images/logos/veeam.svg',           href: 'https://veeam.com' },
  { name: 'Synology',        logo: '/images/logos/synology.svg',        href: 'https://synology.com' },
  { name: 'Wasabi',          logo: '/images/logos/wasabi.svg',          href: 'https://wasabi.com' },
  { name: 'PostgreSQL',      logo: '/images/logos/postgresql.svg',      href: 'https://postgresql.org' },
  { name: 'Redis',           logo: '/images/logos/redis.svg',           href: 'https://redis.io' },
  { name: 'Elasticsearch',   logo: '/images/logos/elasticsearch.svg',   href: 'https://elastic.co' },
  { name: 'Logstash',        logo: '/images/logos/logstash.svg',        href: 'https://elastic.co/logstash' },
  { name: 'Kibana',          logo: '/images/logos/kibana.svg',          href: 'https://elastic.co/kibana' },
  { name: 'Grafana',         logo: '/images/logos/grafana.svg',         href: 'https://grafana.com' },
  { name: 'Zabbix',          logo: '/images/logos/zabbix.svg',          href: 'https://zabbix.com' },
  { name: 'NestJS',          logo: '/images/logos/nestjs.svg',          href: 'https://nestjs.com' },
  { name: 'Next.js',         logo: '/images/logos/nextdotjs.svg',       href: 'https://nextjs.org' },
  { name: 'Bitdefender',     logo: '/images/logos/bitdefender.svg',     href: 'https://bitdefender.com' },
  { name: 'Fortinet',        logo: '/images/logos/fortinet.svg',        href: 'https://fortinet.com' },
  { name: 'Suricata',        logo: '/images/logos/suricata.svg',        href: 'https://suricata.io' },
  { name: 'Wazuh',           logo: '/images/logos/wazuh.svg',           href: 'https://wazuh.com' },
  { name: 'Greenbone',       logo: '/images/logos/greenbone.svg',       href: 'https://greenbone.net' },
  { name: 'Have I Been Pwned', logo: '/images/logos/haveibeenpwned.svg', href: 'https://haveibeenpwned.com' },
  { name: 'RustDesk',        logo: '/images/logos/rustdesk.svg',        href: 'https://rustdesk.com' },
  { name: 'Snipe-IT',        logo: '/images/logos/snipeit.svg',         href: 'https://snipeitapp.com' },
  { name: 'Caldera',         logo: '/images/logos/caldera.svg',         href: 'https://caldera.mitre.org' },
  { name: 'Adobe',           logo: '/images/logos/adobe.svg',           href: 'https://adobe.com' },
];

// ── STACK ────────────────────────────────────────────────────────────────────
export const stack = [
  {
    id: 'infra',
    category: 'Infraestructura',
    items: [
      { title: 'Windows Server', description: 'Administración de roles AD, DNS/DHCP, GPOs y gestión de dominio en entornos de producción.' },
      { title: 'Proxmox VE', description: 'Clúster de virtualización con HA, gestión de VMs y contenedores LXC.' },
      { title: 'VMware ESXi', description: 'Hipervisor tipo 1 para entornos corporativos con gestión vSphere.' },
      { title: 'Hyper-V', description: 'Virtualización Microsoft con réplica y failover en entorno Windows Server.' },
      { title: 'Linux', description: 'Debian/Ubuntu como base para servidores, contenedores y automatización.' },
      { title: 'Active Directory', description: 'Diseño de OUs, delegación, consolidación de dominios y GPOs avanzadas.' },
      { title: 'Veeam', description: 'Backup de VMs y servidores físicos con políticas de retención y restauración granular.' },
      { title: 'Synology', description: 'NAS corporativo con snapshots, replicación y Hyper Backup offsite.' },
      { title: 'Wasabi', description: 'Almacenamiento S3 compatible para backups offsite de bajo coste.' },
      { title: 'MinIO', description: 'Almacenamiento tipo S3 self-hosted para proyectos y entornos internos.' },
    ],
  },
  {
    id: 'redes',
    category: 'Redes',
    items: [
      { title: 'Cisco', description: 'Configuración de switches y routers en entornos de pequeña y mediana empresa.' },
      { title: 'Aruba', description: 'Redes WiFi empresariales con controlador y políticas de acceso por rol.' },
      { title: 'Ubiquiti UniFi', description: 'Despliegue y gestión de redes WiFi en arquitecturas multi-sede.' },
      { title: 'VLANs', description: 'Segmentación de red por función, nivel de confianza y aislamiento de tráfico.' },
      { title: 'RADIUS / NPS', description: 'Autenticación de acceso a red corporativa con políticas y certificados internos.' },
      { title: '802.1X / PEAP', description: 'Control de acceso WiFi empresarial mediante autenticación por certificado.' },
    ],
  },
  {
    id: 'cloud',
    category: 'Microsoft Cloud',
    items: [
      { title: 'Entra ID', description: 'Gestión de identidades, SSO, acceso condicional y MFA para entornos híbridos.' },
      { title: 'Microsoft Intune', description: 'MDM y MAM para gestión y cumplimiento de dispositivos corporativos.' },
      { title: 'Purview DLP', description: 'Políticas de prevención de pérdida de datos en todo el ecosistema Microsoft 365.' },
      { title: 'Azure', description: 'Recursos cloud: VMs, storage, networking y gestión de suscripciones.' },
      { title: 'Microsoft 365', description: 'Administración de Exchange, SharePoint, Teams y gestión de licencias.' },
    ],
  },
  {
    id: 'sec',
    category: 'Seguridad & Ops',
    items: [
      { title: 'Wazuh', description: 'SIEM/XDR con detección de amenazas, integridad de ficheros y correlación de eventos.' },
      { title: 'Suricata', description: 'IDS/IPS de red con reglas personalizadas y análisis de tráfico en tiempo real.' },
      { title: 'Greenbone / OpenVAS', description: 'Escáner de vulnerabilidades para auditorías periódicas de red interna.' },
      { title: 'Fortinet', description: 'Firewall y UTM para segmentación perimetral y filtrado de tráfico.' },
      { title: 'Bitdefender', description: 'EDR corporativo con gestión centralizada de endpoints y políticas de protección.' },
      { title: 'PKI / CA interna', description: 'Emisión y gestión de certificados para servicios internos y autenticación de red.' },
      { title: 'Caldera (MITRE ATT&CK)', description: 'Simulación de adversarios para validar controles defensivos en entorno controlado.' },
      { title: 'Passbolt', description: 'Gestor de contraseñas self-hosted para equipos con control de acceso por rol.' },
      { title: 'Grafana', description: 'Dashboards de métricas e infraestructura con alertas y visualización en tiempo real.' },
      { title: 'Zabbix', description: 'Monitorización de red, servidores y servicios con alertas y escalado de incidencias.' },
      { title: 'Elasticsearch', description: 'Motor de búsqueda e ingesta de logs a escala para análisis forense y operacional.' },
      { title: 'Logstash', description: 'Pipeline de normalización y enriquecimiento de logs antes de su indexación.' },
      { title: 'Kibana', description: 'Visualización y exploración del stack ELK para operaciones y seguridad.' },
    ],
  },
  {
    id: 'devops',
    category: 'Contenedores',
    items: [
      { title: 'Docker', description: 'Contenerización de servicios para entornos de producción y desarrollo.' },
      { title: 'Docker Compose', description: 'Orquestación de stacks multi-contenedor con redes, volúmenes y variables de entorno.' },
      { title: 'Caddy', description: 'Reverse proxy con HTTPS automático vía Let\'s Encrypt y configuración declarativa.' },
      { title: 'Redis', description: 'Caché en memoria, broker de mensajes y almacenamiento de sesiones distribuidas.' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Datos',
    items: [
      { title: 'PostgreSQL', description: 'Base de datos relacional principal en proyectos propios y portales empresariales.' },
      { title: 'NestJS', description: 'Framework TypeScript para APIs REST modulares con decoradores e inyección de dependencias.' },
      { title: 'Next.js', description: 'Aplicaciones web full-stack con SSR, SSG y despliegue self-hosted o en Vercel.' },
    ],
  },
  {
    id: 'gestion',
    category: 'Gestión IT',
    items: [
      { title: 'Snipe-IT', description: 'Inventario de activos IT con asignaciones, licencias y historial de auditoría.' },
      { title: 'RustDesk', description: 'Soporte remoto self-hosted sin depender de servicios externos de terceros.' },
      { title: 'Pterodactyl', description: 'Panel de gestión de servidores sobre Proxmox para entornos de servicios gestionados.' },
      { title: 'Have I Been Pwned', description: 'Verificación y monitorización de credenciales comprometidas para usuarios corporativos.' },
    ],
  },
];

export const projects = [
  {
    type: 'Side project · Bot',
    title: 'NoMeJuzgues',
    description:
      'Bot con memoria de usuario, lógica de respuesta propia y almacenamiento en PostgreSQL. Arquitectura completa con NestJS, caché Redis y almacenamiento tipo S3 con MinIO.',
    tags: ['NestJS', 'PostgreSQL', 'Redis', 'MinIO', 'Docker'],
    wip: true,
    href: null,
    logo: '/images/nmj-isologo.svg',
    logoHover: '/images/nmj-isologo-color.svg',
  },
  {
    type: 'Infraestructura · Sistemas Distribuidos',
    title: 'hynix.network',
    description:
      'Clúster proxy multi-nodo con autenticación híbrida. Red de dos regiones (EU y LATAM) sobre Waterfall/BungeeCord con 5 nodos por región, autenticación híbrida (Mojang API + BCrypt), 2FA TOTP, permisos distribuidos con LuckPerms+PostgreSQL y entrega automática de tienda. Gestionado con Pterodactyl sobre Proxmox.',
    tags: ['Waterfall', 'BungeeCord', 'Redis', 'PostgreSQL', 'LuckPerms', 'TOTP', 'Pterodactyl', 'Proxmox'],
    wip: false,
    href: '/projects/minecraft-cluster',
    logo: '/images/minecraft-block.svg',
  },
];
