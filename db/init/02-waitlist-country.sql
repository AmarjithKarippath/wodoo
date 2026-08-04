ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS country VARCHAR(100);

CREATE INDEX IF NOT EXISTS waitlist_country_idx ON waitlist (country);
