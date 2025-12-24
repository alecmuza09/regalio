-- Tabla de intercambios (exchanges)
CREATE TABLE IF NOT EXISTS exchanges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  preference_deadline DATE NOT NULL,
  exchange_date DATE NOT NULL,
  budget_min INTEGER NOT NULL,
  budget_max INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de participantes
CREATE TABLE IF NOT EXISTS participants (
  id TEXT PRIMARY KEY,
  exchange_id TEXT NOT NULL REFERENCES exchanges(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  budget INTEGER NOT NULL,
  preferences JSONB DEFAULT '[]'::jsonb,
  links JSONB DEFAULT '[]'::jsonb,
  notes TEXT DEFAULT '',
  assigned_to TEXT REFERENCES participants(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pendiente' CHECK (status IN ('completo', 'pendiente')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_participants_exchange_id ON participants(exchange_id);
CREATE INDEX IF NOT EXISTS idx_participants_assigned_to ON participants(assigned_to);
CREATE INDEX IF NOT EXISTS idx_exchanges_created_at ON exchanges(created_at);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_exchanges_updated_at BEFORE UPDATE ON exchanges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE exchanges ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad: Permitir lectura y escritura a todos (puedes ajustar esto según tus necesidades)
CREATE POLICY "Allow all operations on exchanges" ON exchanges
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on participants" ON participants
  FOR ALL USING (true) WITH CHECK (true);

