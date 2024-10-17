DROP TABLE IF EXISTS public.coach;
DROP TABLE IF EXISTS public.player;
DROP TABLE IF EXISTS public.team;

CREATE TABLE "team" (
  "id" SERIAL PRIMARY KEY,
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

ALTER TABLE "player" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("id") ON DELETE SET NULL;
ALTER TABLE "coach" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("id") ON DELETE SET NULL;

-- Function for keeping total_players updated
CREATE OR REPLACE FUNCTION update_total_players()
RETURNS TRIGGER AS $$
BEGIN
  -- Handle INSERT: update the total_players for the new team
  IF TG_OP = 'INSERT' THEN
    UPDATE team
    SET total_players = (SELECT COUNT(*) FROM player WHERE team_id = NEW.team_id)
    WHERE id = NEW.team_id;
  -- Handle DELETE: update the total_players for the old team
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE team
    SET total_players = (SELECT COUNT(*) FROM player WHERE team_id = OLD.team_id)
    WHERE id = OLD.team_id;
  -- Handle UPDATE where the team_id changes: update both old and new teams
  ELSIF TG_OP = 'UPDATE' AND OLD.team_id IS DISTINCT FROM NEW.team_id THEN
    -- Update the old team
    UPDATE team
    SET total_players = (SELECT COUNT(*) FROM player WHERE team_id = OLD.team_id)
    WHERE id = OLD.team_id;
    -- Update the new team
    UPDATE team
    SET total_players = (SELECT COUNT(*) FROM player WHERE team_id = NEW.team_id)
    WHERE id = NEW.team_id;
  -- Handle UPDATE where team_id remains the same: just update the current team
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE team
    SET total_players = (SELECT COUNT(*) FROM player WHERE team_id = NEW.team_id)
    WHERE id = NEW.team_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Trigger function after insert, delete, or update on player table
CREATE TRIGGER update_total_players_trigger
AFTER INSERT OR DELETE OR UPDATE ON player
FOR EACH ROW EXECUTE FUNCTION update_total_players();


-- Function to enforce max capacity
CREATE OR REPLACE FUNCTION enforce_max_capacity() 
RETURNS TRIGGER AS $$
BEGIN
  -- Count the current number of players in the team
  IF (SELECT COUNT(*) FROM player WHERE team_id = NEW.team_id) >= (SELECT max_capacity FROM team WHERE id = NEW.team_id) THEN
    RAISE EXCEPTION 'Team is at maximum capacity';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Trigger function after insert or update on player table
CREATE TRIGGER check_max_capacity
BEFORE INSERT OR UPDATE ON player
FOR EACH ROW
EXECUTE FUNCTION enforce_max_capacity();


-- Add Indexes for performance optimization
CREATE INDEX idx_team_name ON team(team_name);
CREATE INDEX idx_player_team_id ON player(team_id);
CREATE INDEX idx_coach_team_id ON coach(team_id);
