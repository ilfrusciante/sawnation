-- SAWNation Database Schema
-- Da eseguire su Supabase SQL Editor

-- 1. CITIZENS
CREATE TABLE IF NOT EXISTS citizens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  citizen_number BIGINT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code CHAR(2) NOT NULL,
  university TEXT,
  photo_url TEXT,
  stripe_payment_id TEXT UNIQUE NOT NULL,
  passport_issued_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CITIZEN COUNTRIES (for the map)
CREATE TABLE IF NOT EXISTS citizen_countries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  country TEXT UNIQUE NOT NULL,
  country_code CHAR(2) NOT NULL,
  lat DECIMAL(8,4),
  lng DECIMAL(8,4),
  count BIGINT DEFAULT 0
);

-- Country coordinates
INSERT INTO citizen_countries (country, country_code, lat, lng, count) VALUES
  ('Italia', 'IT', 41.9, 12.5, 0),
  ('USA', 'US', 37.09, -95.71, 0),
  ('Germania', 'DE', 51.16, 10.45, 0),
  ('Francia', 'FR', 46.2, 2.2, 0),
  ('Brasile', 'BR', -14.2, -51.9, 0),
  ('India', 'IN', 20.6, 79.0, 0),
  ('Ucraina', 'UA', 48.4, 31.2, 0),
  ('Palestina', 'PS', 31.5, 34.5, 0),
  ('Spagna', 'ES', 40.4, -3.7, 0),
  ('Regno Unito', 'GB', 55.4, -3.4, 0)
ON CONFLICT (country) DO NOTHING;

-- Function to upsert country count
CREATE OR REPLACE FUNCTION upsert_citizen_country(p_country TEXT, p_country_code TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO citizen_countries (country, country_code, count)
  VALUES (p_country, p_country_code, 1)
  ON CONFLICT (country) DO UPDATE SET count = citizen_countries.count + 1;
END;
$$ LANGUAGE plpgsql;

-- 3. TRANSACTIONS
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT CHECK (type IN ('passport', 'sponsorship', 'donation', 'event')) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  fund_students DECIMAL(10,2) NOT NULL,
  fund_platform DECIMAL(10,2) NOT NULL,
  stripe_id TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. LEADERS (Tribunale dei Capi)
CREATE TABLE IF NOT EXISTS leaders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  age INT,
  children_in_war INT DEFAULT 0,
  war_decisions INT DEFAULT 0,
  arms_sales_billion DECIMAL(6,2) DEFAULT 0,
  status TEXT CHECK (status IN ('in_verifica', 'verificato', 'pubblicato')) DEFAULT 'in_verifica',
  published_at TIMESTAMPTZ,
  sources JSONB DEFAULT '[]',
  saw_citizens_in_country BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MEME CHALLENGES
CREATE TABLE IF NOT EXISTS meme_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  week_start TIMESTAMPTZ NOT NULL,
  theme TEXT NOT NULL,
  description TEXT,
  template_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MEME SUBMISSIONS
CREATE TABLE IF NOT EXISTS meme_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES meme_challenges(id) ON DELETE CASCADE,
  citizen_id UUID REFERENCES citizens(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  votes INT DEFAULT 0,
  is_winner BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vote function (prevents double voting via IP/session in future)
CREATE OR REPLACE FUNCTION vote_meme(submission_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE meme_submissions SET votes = votes + 1 WHERE id = submission_id;
END;
$$ LANGUAGE plpgsql;

-- 7. SPOKESPERSONS (Anti-Parlamento)
CREATE TABLE IF NOT EXISTS spokespersons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  citizen_id UUID REFERENCES citizens(id) ON DELETE CASCADE,
  country TEXT NOT NULL,
  week_start TIMESTAMPTZ NOT NULL,
  week_end TIMESTAMPTZ NOT NULL,
  message TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SCHOLAR STUDENTS
CREATE TABLE IF NOT EXISTS scholar_students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INT NOT NULL,
  country TEXT NOT NULL,
  university TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  story TEXT NOT NULL,
  dream TEXT NOT NULL,
  photo_url TEXT,
  monthly_grant DECIMAL(8,2) NOT NULL,
  grant_start TIMESTAMPTZ NOT NULL,
  updates JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE meme_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE meme_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE spokespersons ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholar_students ENABLE ROW LEVEL SECURITY;

-- Public READ access (bilancio trasparente, mappa pubblica)
CREATE POLICY "Public read citizens" ON citizens FOR SELECT USING (true);
CREATE POLICY "Public read countries" ON citizen_countries FOR SELECT USING (true);
CREATE POLICY "Public read transactions" ON transactions FOR SELECT USING (true);
CREATE POLICY "Public read leaders" ON leaders FOR SELECT USING (status = 'pubblicato');
CREATE POLICY "Public read challenges" ON meme_challenges FOR SELECT USING (true);
CREATE POLICY "Public read submissions" ON meme_submissions FOR SELECT USING (true);
CREATE POLICY "Public read spokespersons" ON spokespersons FOR SELECT USING (true);
CREATE POLICY "Public read scholars" ON scholar_students FOR SELECT USING (true);

-- Only service_role can INSERT/UPDATE/DELETE
CREATE POLICY "Service insert citizens" ON citizens FOR INSERT WITH CHECK (true);
CREATE POLICY "Service insert transactions" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Service insert submissions" ON meme_submissions FOR INSERT WITH CHECK (true);

-- ============================================
-- REALTIME
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE citizens;
ALTER PUBLICATION supabase_realtime ADD TABLE citizen_countries;
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE meme_submissions;

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_citizens_country ON citizens(country_code);
CREATE INDEX idx_transactions_created ON transactions(created_at DESC);
CREATE INDEX idx_meme_submissions_votes ON meme_submissions(votes DESC);
CREATE INDEX idx_leaders_status ON leaders(status);
