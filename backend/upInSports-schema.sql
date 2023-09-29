CREATE TABLE teams (
  id INTEGER PRIMARY KEY, 
  name TEXT NOT NULL,
  nickname VARCHAR(25),
  code TEXT,
  city TEXT NOT NULL,
  logo TEXT,
  nba_franchise BOOLEAN DEFAULT TRUE
);

CREATE TABLE players (
    id INTEGER PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL    
);

-- CREATE TABLE games (
--     id INTEGER PRIMARY KEY,
--     date DATE,
--     arena TEXT,
--     visitors_id INTEGER
--         REFERENCES teams ON DELETE CASCADE,
--     home_id INTEGER
--         REFERENCES teams,
--     home_team_score INTEGER,
--     away_team_score INTEGER
-- );

-- CREATE TABLE player_stats (
--     id INTEGER PRIMARY KEY,
--     game_id INTEGER 
--         REFERENCES games ON DELETE CASCADE,
--     player_id INTEGER
--         REFERENCES players ON DELETE CASCADE,
--     player_team_id INTEGER 
--         REFERENCES teams ON DELETE CASCADE,
--     points INTEGER,
--     rebounds INTEGER,
--     assists INTEGER,
--     steals INTEGER,
--     blocks INTEGER,
--     turnovers INTEGER,
--     position VARCHAR(25) 
-- );

CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL 
        CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);