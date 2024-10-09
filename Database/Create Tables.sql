DROP TABLE IF EXISTS public.coach;

DROP TABLE IF EXISTS public.player;

DROP TABLE IF EXISTS public.team;

CREATE TABLE "team" (
  "team_id" SERIAL PRIMARY KEY,
  "team_name" VARCHAR(255) UNIQUE NOT NULL,
  "team_logo" TEXT,
  "team_city" VARCHAR(100),
  "team_founded_year" INTEGER,
  "total_players" INTEGER DEFAULT 0,
  "max_capacity" INTEGER DEFAULT 20,
  "wins" INTEGER DEFAULT 0,
  "losses" INTEGER DEFAULT 0
);

CREATE TABLE "player" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "height" NUMERIC(4,2),
  "weight" NUMERIC(5,2),
  "position" VARCHAR(50),
  "jersey_number" INTEGER,
  "date_of_birth" DATE,
  "goals_scored" INTEGER DEFAULT 0,
  "team_id" INTEGER
);

CREATE TABLE "coach" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL,
  "years_of_experience" INTEGER,
  "salary" NUMERIC(10,2),
  "email" VARCHAR(255),
  "phone_number" VARCHAR(15),
  "team_id" INTEGER
);

ALTER TABLE "player" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("team_id") ON DELETE SET NULL;

ALTER TABLE "coach" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("team_id") ON DELETE SET NULL;

-- Add Indexes (Optional for performance optimization)
CREATE INDEX idx_team_name ON team(team_name);
CREATE INDEX idx_player_team_id ON player(team_id);
CREATE INDEX idx_coach_team_id ON coach(team_id);

CREATE OR REPLACE FUNCTION update_total_players()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE team
  SET total_players = (SELECT COUNT(*) FROM player WHERE team_id = NEW.team_id)
  WHERE team_id = NEW.team_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger after insert or delete on player table
CREATE TRIGGER update_total_players_trigger
AFTER INSERT OR DELETE OR UPDATE ON player
FOR EACH ROW EXECUTE FUNCTION update_total_players();