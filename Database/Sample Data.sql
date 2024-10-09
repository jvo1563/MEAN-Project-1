-- Insert Sample Data
INSERT INTO "team" (team_name, team_logo, team_city, team_founded_year, total_players, max_capacity, wins, losses)
VALUES 
('The Wildcats', 'https://example.com/logos/wildcats.png', 'New York', 2005, 15, 20, 10, 3),
('The Sharks', 'https://example.com/logos/sharks.png', 'Los Angeles', 2010, 18, 20, 12, 5),
('The Eagles', 'https://example.com/logos/eagles.png', 'Chicago', 2012, 20, 20, 8, 7),
('The Dragons', 'https://example.com/logos/dragons.png', 'Houston', 2008, 17, 20, 9, 6),
('The Panthers', 'https://example.com/logos/panthers.png', 'Philadelphia', 2015, 12, 20, 7, 8),
('The Thunder', 'https://example.com/logos/thunder.png', 'Phoenix', 2011, 19, 20, 11, 4),
('The Lions', 'https://example.com/logos/lions.png', 'San Antonio', 2009, 14, 20, 6, 9),
('The Titans', 'https://example.com/logos/titans.png', 'San Diego', 2013, 20, 20, 13, 2),
('The Warriors', 'https://example.com/logos/warriors.png', 'Miami', 2016, 0, 20, 0, 0),  -- Team with max players
('Empty Team', 'https://example.com/logos/empty.png', 'Nowhere', 2016, 0, 0, 0, 0); -- Team with no players

INSERT INTO "player" (first_name, last_name, height, weight, position, jersey_number, date_of_birth, goals_scored, team_id)
VALUES 
('John', 'Doe', 6.2, 180, 'Forward', 9, '1990-05-15', 12, 1),
('Alice', 'Smith', 5.8, 160, 'Midfielder', 7, '1992-03-22', 8, 1),
('Bob', 'Brown', 6.1, 185, 'Goalkeeper', 1, '1994-07-09', 0, 2),
('Eve', 'Williams', 5.5, 140, 'Defender', 4, '1996-11-30', 3, 3),
-- Players for The Dragons (team_id = 4)
('Chris', 'Evans', 6.0, 175, 'Defender', 5, '1991-02-13', 2, 4),
('Olivia', 'Davis', 5.8, 160, 'Defender', 6, '1992-08-14', 1, 4),
('Ethan', 'Moore', 6.0, 175, 'Midfielder', 13, '1992-02-20', 5, 4),
-- Players for The Panthers (team_id = 5)
('Emily', 'Clark', 5.7, 150, 'Midfielder', 8, '1993-06-25', 5, 5),
('Isabella', 'Taylor', 5.5, 135, 'Defender', 3, '1994-03-07', 4, 5),
('Daniel', 'Martinez', 6.3, 190, 'Forward', 11, '1989-09-17', 15, 5),
-- Players for The Thunder (team_id = 6)
('Sophia', 'Johnson', 5.6, 145, 'Forward', 10, '1995-12-03', 9, 6),
('James', 'Wilson', 6.1, 180, 'Midfielder', 7, '1990-11-21', 7, 6),
('Benjamin', 'Anderson', 6.4, 200, 'Forward', 12, '1987-05-19', 18, 6),
-- Players for The Lions (team_id = 7)
('Michael', 'Brown', 6.2, 185, 'Goalkeeper', 1, '1988-04-28', 0, 7),
('Ava', 'White', 5.6, 140, 'Forward', 9, '1993-07-22', 11, 7),
('William', 'Jackson', 6.0, 170, 'Defender', 2, '1991-01-05', 3, 7),
-- Players without a team (team_id = NULL)
('Grace', 'Lee', 5.7, 150, 'Forward', 15, '1994-06-30', 8, NULL),
('Liam', 'Scott', 6.2, 180, 'Midfielder', 16, '1995-09-12', 6, NULL),
('Mia', 'Thompson', 5.5, 130, 'Defender', 4, '1996-11-03', 2, NULL),
-- Players for The Titans (team_id = 8)
('Noah', 'Adams', 6.1, 185, 'Forward', 17, '1990-07-08', 14, 8),
('Charlotte', 'Green', 5.9, 155, 'Midfielder', 18, '1992-04-19', 9, 8),
('Lucas', 'Baker', 6.3, 195, 'Defender', 19, '1988-12-27', 5, 8),
-- Players for The Rockets (team_id = 9) -- Team at max capacity
('Player1', 'Rockets', 6.0, 170, 'Midfielder', 1, '1990-01-01', 0, 9),
('Player2', 'Rockets', 6.1, 171, 'Forward', 2, '1990-02-02', 0, 9),
('Player3', 'Rockets', 6.2, 172, 'Defender', 3, '1990-03-03', 0, 9),
('Player4', 'Rockets', 6.3, 173, 'Goalkeeper', 4, '1990-04-04', 0, 9),
('Player5', 'Rockets', 6.4, 174, 'Midfielder', 5, '1990-05-05', 0, 9),
('Player6', 'Rockets', 6.5, 175, 'Forward', 6, '1990-06-06', 0, 9),
('Player7', 'Rockets', 6.6, 176, 'Defender', 7, '1990-07-07', 0, 9),
('Player8', 'Rockets', 6.7, 177, 'Goalkeeper', 8, '1990-08-08', 0, 9),
('Player9', 'Rockets', 6.8, 178, 'Midfielder', 9, '1990-09-09', 0, 9),
('Player10', 'Rockets', 6.9, 179, 'Forward', 10, '1990-10-10', 0, 9),
('Player11', 'Rockets', 6.0, 180, 'Defender', 11, '1990-11-11', 0, 9),
('Player12', 'Rockets', 6.1, 181, 'Goalkeeper', 12, '1990-12-12', 0, 9),
('Player13', 'Rockets', 6.2, 182, 'Midfielder', 13, '1991-01-13', 0, 9),
('Player14', 'Rockets', 6.3, 183, 'Forward', 14, '1991-02-14', 0, 9),
('Player15', 'Rockets', 6.4, 184, 'Defender', 15, '1991-03-15', 0, 9),
('Player16', 'Rockets', 6.5, 185, 'Goalkeeper', 16, '1991-04-16', 0, 9),
('Player17', 'Rockets', 6.6, 186, 'Midfielder', 17, '1991-05-17', 0, 9),
('Player18', 'Rockets', 6.7, 187, 'Forward', 18, '1991-06-18', 0, 9),
('Player19', 'Rockets', 6.8, 188, 'Defender', 19, '1991-07-19', 0, 9),
('Player20', 'Rockets', 6.9, 189, 'Goalkeeper', 20, '1991-08-20', 0, 9);

INSERT INTO "coach" (first_name, last_name, years_of_experience, salary, email, phone_number, team_id)
VALUES 
('Mike', 'Johnson', 15, 75000.00, 'mike.johnson@example.com', '123-456-7890', 1),
('Sarah', 'Parker', 10, 65000.00, 'sarah.parker@example.com', '123-456-7891', 2),
('David', 'Lee', 12, 70000.00, 'david.lee@example.com', '123-456-7892', 3),
-- Coaches for The Lions (team_id = 7)
('Laura', 'Martin', 8, 60000.00, 'laura.martin@example.com', '123-456-7893', 7),
-- Coaches for The Titans (team_id = 8)
('Peter', 'Garcia', 14, 80000.00, 'peter.garcia@example.com', '123-456-7894', 8),
('Rachel', 'Roberts', 5, 58000.00, 'rachel.roberts@example.com', '123-456-7895', 8),  -- Assistant Coach
-- Coaches for The Warriors (team_id = 9) -- Team with max players
('Anthony', 'Young', 5, 55000.00, 'anthony.young@example.com', '123-456-7896', 9),
-- Coaches without a team (team_id = NULL)
('Samantha', 'King', 6, 60000.00, 'samantha.king@example.com', '123-456-7897', NULL),
('Kevin', 'Perez', 6, 61000.00, 'kevin.perez@example.com', '123-456-7898', NULL);

--UPDATE "team" SET total_players = (
--    SELECT COUNT(*) FROM "player" WHERE "player".team_id = "team".team_id
--);