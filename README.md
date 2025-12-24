# 🎁 Regalio - Aplicación de Intercambio de Regalos

Una aplicación moderna y elegante para organizar intercambios de regalos (amigo secreto) con seguimiento de preferencias, sugerencias personalizadas y gestión de participantes.

## ✨ Características

- 🎯 **Creación de Intercambios**: Configura eventos personalizados con fechas y presupuestos
- 👥 **Gestión de Participantes**: Agrega participantes manualmente o comparte un enlace de invitación
- 💝 **Preferencias de Regalos**: Los participantes pueden especificar sus preferencias, enlaces y notas
- 🔗 **Enlaces Compartibles**: Comparte fácilmente el enlace de invitación con todos
- 📊 **Dashboard del Organizador**: Vista completa del estado de todos los participantes
- 🎨 **Diseño Moderno**: Interfaz hermosa y responsiva con tema claro/oscuro
- 🗄️ **Base de Datos Supabase**: Almacenamiento persistente y confiable

## 🚀 Tecnologías

- **Framework**: [Next.js 16](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Base de Datos**: [Supabase](https://supabase.com/)
- **Gestión de Paquetes**: pnpm

## 📋 Requisitos Previos

- Node.js 18+ 
- pnpm (o npm/yarn)
- Cuenta de Supabase

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/alecmuza09/regalio.git
   cd regalio
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
   SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio
   ```

4. **Configurar la base de datos**
   
   - Ve a tu proyecto en [Supabase](https://supabase.com)
   - Abre el SQL Editor
   - Copia y ejecuta el contenido de `supabase-schema.sql`

5. **Iniciar el servidor de desarrollo**
   ```bash
   pnpm dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📖 Guía de Uso

### Crear un Intercambio

1. Haz clic en "Crear Intercambio" en la página principal
2. Completa los detalles del evento (nombre, tipo, fechas, presupuesto)
3. Haz clic en "Crear Intercambio"

### Invitar Participantes

Tienes dos opciones:

**Opción 1: Enlace de invitación**
- Copia el enlace compartible desde el dashboard del organizador
- Envíalo a los participantes por tu medio preferido

**Opción 2: Agregar manualmente**
- Haz clic en "Agregar Participante" en el dashboard
- Completa los datos del participante

### Dashboard del Participante

Los participantes pueden:
- Ver a quién le van a regalar
- Agregar sus preferencias de regalo
- Añadir enlaces útiles
- Ver el presupuesto y fechas importantes

## 📁 Estructura del Proyecto

```
regalio/
├── app/                          # Páginas de Next.js
│   ├── create/                   # Crear nuevo intercambio
│   ├── exchange/[id]/            # Dashboard del organizador
│   │   ├── join/                 # Unirse al intercambio
│   │   └── participant/[id]/     # Dashboard del participante
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página de inicio
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes UI de shadcn
│   └── theme-provider.tsx        # Provider de tema
├── lib/                          # Utilidades y lógica
│   ├── storage.ts                # Funciones de base de datos
│   ├── supabase.ts               # Cliente de Supabase
│   ├── mock-data.ts              # Datos de ejemplo
│   └── utils.ts                  # Utilidades generales
├── public/                       # Archivos estáticos
├── supabase-schema.sql           # Esquema de la base de datos
├── README-SUPABASE.md            # Guía de configuración de Supabase
└── package.json                  # Dependencias
```

## 🗄️ Esquema de Base de Datos

### Tabla: exchanges
Almacena la información de cada intercambio de regalos

### Tabla: participants
Almacena los participantes de cada intercambio con sus preferencias

Ver `supabase-schema.sql` para más detalles.

## 🎨 Personalización

### Tema
La aplicación usa un tema personalizado definido en `app/globals.css`. Puedes modificar los colores cambiando las variables CSS.

### Componentes
Los componentes UI están en `components/ui/` y pueden ser personalizados según tus necesidades.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Alec Muza**
- GitHub: [@alecmuza09](https://github.com/alecmuza09)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

⭐ Si te gusta este proyecto, considera darle una estrella en GitHub!

