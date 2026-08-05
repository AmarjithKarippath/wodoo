CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at DATE,
  author VARCHAR(255) NOT NULL DEFAULT 'Wodoo Store Team',
  reading_minutes INTEGER NOT NULL DEFAULT 5,
  tags TEXT[] NOT NULL DEFAULT '{}',
  hero VARCHAR(500),
  body JSONB NOT NULL,
  source_markdown TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);
