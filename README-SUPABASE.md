# Configuración de Supabase

Este proyecto está configurado para usar Supabase como base de datos.

## Pasos de configuración

### 1. Crear el archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

**Obtén estas credenciales de:**
1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Settings → API
3. Copia "Project URL", "anon/public key" y "service_role key"

### 2. Ejecutar el script SQL en Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard/project/wimnaebmhyoghtxompdu
2. Ve a la sección "SQL Editor"
3. Copia y pega el contenido del archivo `supabase-schema.sql`
4. Ejecuta el script para crear las tablas necesarias

### 3. Verificar las tablas

Después de ejecutar el script, deberías tener las siguientes tablas:
- `exchanges` - Almacena los intercambios de regalos
- `participants` - Almacena los participantes de cada intercambio

### 4. Reiniciar el servidor de desarrollo

Después de configurar las variables de entorno, reinicia el servidor:

```bash
pnpm dev
```

## Estructura de la base de datos

### Tabla: exchanges
- `id` (TEXT, PRIMARY KEY)
- `name` (TEXT)
- `event_type` (TEXT)
- `preference_deadline` (DATE)
- `exchange_date` (DATE)
- `budget_min` (INTEGER)
- `budget_max` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Tabla: participants
- `id` (TEXT, PRIMARY KEY)
- `exchange_id` (TEXT, FOREIGN KEY -> exchanges.id)
- `name` (TEXT)
- `email` (TEXT)
- `budget` (INTEGER)
- `preferences` (JSONB)
- `links` (JSONB)
- `notes` (TEXT)
- `assigned_to` (TEXT, FOREIGN KEY -> participants.id)
- `status` (TEXT: 'completo' | 'pendiente')
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Notas importantes

- Las políticas de seguridad (RLS) están configuradas para permitir todas las operaciones. En producción, deberías ajustar estas políticas según tus necesidades de seguridad.
- El proyecto usa el cliente de Supabase para todas las operaciones de base de datos.
- Si hay errores de conexión, verifica que las variables de entorno estén correctamente configuradas.

