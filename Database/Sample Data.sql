-- Insert Sample Data
INSERT INTO "team" (team_name, team_logo, team_city, team_founded_year, total_players, max_capacity, wins, losses)
VALUES 
('The Wildcats', 'https://t4.ftcdn.net/jpg/02/19/75/71/360_F_219757132_MrtGjHVcnIQ917MV07COhjhuBdFlC1eO.jpg', 'New York', 2005, 0, 20, 10, 3),
('The Sharks', 'https://media.istockphoto.com/id/1396000873/vector/angry-shark-mascot-logo-vector-illustration-design-animals-mascot-logo.jpg?s=612x612&w=0&k=20&c=kK6Gs0R_NWgbGk2Pbvh5ZbT4aDYdFyp3Ig0Z-hRLHmg=', 'Los Angeles', 2010, 0, 20, 12, 5),
('The Eagles', 'https://as2.ftcdn.net/v2/jpg/02/11/88/47/1000_F_211884724_NQXy0HFSlkHjf5OOF5Bh6r7d5iEw9IZM.jpg', 'Chicago', 2012, 0, 20, 8, 7),
('The Dragons', 'https://www.shutterstock.com/image-vector/dragon-esport-logo-mascot-design-600nw-2313062541.jpg', 'Houston', 2008, 0, 20, 9, 6),
('The Panthers', 'https://i.pinimg.com/originals/f3/9c/81/f39c81660a41910eeadc167fc3cab34b.png', 'Philadelphia', 2015, 0, 20, 7, 8),
('The Thunder', 'https://media.istockphoto.com/id/1412715867/vector/electric-power-vector-icon.jpg?s=612x612&w=0&k=20&c=dkE2skX6iW8gBR4qussOzURGZMln7eSbakkXi0xJEgQ=', 'Phoenix', 2011, 0, 20, 11, 4),
('The Lions', 'https://static.vecteezy.com/system/resources/previews/006/735/669/non_2x/lion-head-gaming-logo-for-esport-and-sport-mascot-illustration-vector.jpg', 'San Antonio', 2009, 0, 20, 6, 9),
('The Titans', 'https://i.pinimg.com/originals/94/48/a3/9448a364ee2e9fcaea0d968687f45c9a.png', 'San Diego', 2013, 0, 20, 13, 2),
('The Warriors', 'https://content.sportslogos.net/logos/6/235/full/1bhcqs6l5t44lw04y1tygdsce.png', 'Miami', 2016, 0, 20, 0, 0),  -- Team with max players
('Ball Kickers', 'https://static.vecteezy.com/system/resources/previews/023/731/674/non_2x/soccer-ball-icon-football-kick-illustration-sign-goal-symbol-or-logo-vector.jpg', 'San Jose', 2016, 0, 20, 40, 0);

INSERT INTO "player" (first_name, last_name, height, weight, position, jersey_number, date_of_birth, goals_scored, team_id)
VALUES 
-- Players for The Warriors (team_id = 1)
('John', 'Doe', 6.2, 180, 'Forward', 9, '1990-05-15', 12, 1),
('Alice', 'Smith', 5.8, 160, 'Midfielder', 7, '1992-03-22', 8, 1),
('Sam', 'Johnson', 6.0, 175, 'Defender', 5, '1991-08-18', 4, 1),
('Oliver', 'Taylor', 6.3, 190, 'Forward', 11, '1989-09-01', 15, 1),
('Sophia', 'Miller', 5.5, 150, 'Midfielder', 8, '1994-02-14', 6, 1),
('Ethan', 'Wilson', 6.1, 185, 'Goalkeeper', 1, '1993-11-12', 0, 1),
('Lily', 'Clark', 5.6, 145, 'Forward', 10, '1995-09-25', 9, 1),
('James', 'Baker', 6.4, 200, 'Defender', 3, '1987-03-11', 5, 1),
('Grace', 'Martinez', 5.5, 135, 'Midfielder', 12, '1990-07-30', 7, 1),
('Benjamin', 'Anderson', 6.2, 195, 'Defender', 2, '1988-04-10', 3, 1),
-- Players for The Sharks (team_id = 2)
('Bob', 'Brown', 6.1, 185, 'Goalkeeper', 1, '1994-07-09', 0, 2),
('Emily', 'Parker', 5.8, 160, 'Midfielder', 8, '1993-03-17', 3, 2),
('David', 'Garcia', 6.2, 190, 'Forward', 9, '1990-12-20', 11, 2),
('Jessica', 'Hernandez', 5.7, 150, 'Defender', 4, '1995-01-15', 2, 2),
('Matthew', 'Lopez', 6.0, 180, 'Midfielder', 7, '1992-11-30', 6, 2),
('Sophie', 'Evans', 5.9, 155, 'Defender', 6, '1991-09-22', 1, 2),
('Joshua', 'Moore', 6.1, 185, 'Forward', 10, '1994-06-06', 8, 2),
('Amelia', 'Thomas', 5.6, 145, 'Midfielder', 12, '1992-10-10', 7, 2),
('Daniel', 'Hill', 6.3, 190, 'Defender', 5, '1993-05-27', 4, 2),
('Mia', 'Scott', 5.7, 150, 'Forward', 11, '1991-03-13', 10, 2),
-- Players for The Eagles (team_id = 3)
('Eve', 'Williams', 5.5, 140, 'Defender', 4, '1996-11-30', 3, 3),
('Liam', 'Adams', 6.2, 185, 'Midfielder', 13, '1990-08-12', 5, 3),
('Olivia', 'White', 5.7, 150, 'Midfielder', 14, '1993-04-23', 4, 3),
('Ava', 'Walker', 5.8, 160, 'Defender', 6, '1992-06-10', 2, 3),
('Elijah', 'Green', 6.1, 180, 'Forward', 15, '1995-02-21', 9, 3),
('Mason', 'Young', 6.3, 200, 'Goalkeeper', 1, '1989-09-29', 0, 3),
('Harper', 'King', 5.6, 145, 'Midfielder', 16, '1990-03-08', 6, 3),
('Logan', 'Wright', 6.2, 190, 'Forward', 9, '1991-07-19', 12, 3),
('Ella', 'Hall', 5.5, 130, 'Defender', 17, '1994-12-05', 3, 3),
('Alexander', 'Allen', 6.4, 205, 'Forward', 11, '1988-11-09', 10, 3),
-- Players for The Dragons (team_id = 4)
('Chris', 'Evans', 6.0, 175, 'Defender', 5, '1991-02-13', 2, 4),
('Olivia', 'Davis', 5.8, 160, 'Defender', 6, '1992-08-14', 1, 4),
('Ethan', 'Moore', 6.0, 175, 'Midfielder', 13, '1992-02-20', 5, 4),
('Ryan', 'Nelson', 6.1, 180, 'Midfielder', 8, '1990-09-11', 7, 4),
('Lucas', 'Garrett', 6.2, 185, 'Forward', 9, '1989-10-28', 15, 4),
('Zoe', 'Bryant', 5.7, 140, 'Defender', 7, '1994-07-04', 3, 4),
('Owen', 'Bennett', 6.3, 190, 'Goalkeeper', 1, '1993-05-16', 0, 4),
('Hannah', 'Cole', 5.6, 145, 'Midfielder', 12, '1992-11-24', 6, 4),
('Henry', 'Foster', 6.4, 195, 'Forward', 11, '1988-03-02', 12, 4),
('Chloe', 'Reed', 5.9, 155, 'Midfielder', 10, '1991-08-07', 8, 4),
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
-- Players for The Titans (team_id = 8)
('Noah', 'Adams', 6.1, 185, 'Forward', 17, '1990-07-08', 14, 8),
('Charlotte', 'Green', 5.9, 155, 'Midfielder', 18, '1992-04-19', 9, 8),
('Lucas', 'Baker', 6.3, 195, 'Defender', 19, '1988-12-27', 5, 8),
-- Players for The Rockets (team_id = 9) -- Team at max capacity
('Player1', '1', 6.0, 170, 'Midfielder', 1, '1990-01-01', 0, 9),
('Player2', '2', 6.1, 171, 'Forward', 2, '1990-02-02', 0, 9),
('Player3', '3', 6.2, 172, 'Defender', 3, '1990-03-03', 0, 9),
('Player4', '4', 6.3, 173, 'Goalkeeper', 4, '1990-04-04', 0, 9),
('Player5', '5', 6.4, 174, 'Midfielder', 5, '1990-05-05', 0, 9),
('Player6', '6', 6.5, 175, 'Forward', 6, '1990-06-06', 0, 9),
('Player7', '7', 6.6, 176, 'Defender', 7, '1990-07-07', 0, 9),
('Player8', '8', 6.7, 177, 'Goalkeeper', 8, '1990-08-08', 0, 9),
('Player9', '9', 6.8, 178, 'Midfielder', 9, '1990-09-09', 0, 9),
('Player10', '10', 6.9, 179, 'Forward', 10, '1990-10-10', 0, 9),
('Player11', '11', 6.0, 180, 'Defender', 11, '1990-11-11', 0, 9),
('Player12', '12', 6.1, 181, 'Goalkeeper', 12, '1990-12-12', 0, 9),
('Player13', '13', 6.2, 182, 'Midfielder', 13, '1991-01-13', 0, 9),
('Player14', '14', 6.3, 183, 'Forward', 14, '1991-02-14', 0, 9),
('Player15', '15', 6.4, 184, 'Defender', 15, '1991-03-15', 0, 9),
('Player16', '16', 6.5, 185, 'Goalkeeper', 16, '1991-04-16', 0, 9),
('Player17', '17', 6.6, 186, 'Midfielder', 17, '1991-05-17', 0, 9),
('Player18', '18', 6.7, 187, 'Forward', 18, '1991-06-18', 0, 9),
('Player19', '19', 6.8, 188, 'Defender', 19, '1991-07-19', 0, 9),
('Player20', '20', 6.9, 189, 'Goalkeeper', 20, '1991-08-20', 0, 9),
-- Players without a team (team_id = NULL)
('Grace', 'Lee', 5.7, 150, 'Forward', 15, '1994-06-30', 8, NULL),
('Liam', 'Scott', 6.2, 180, 'Midfielder', 16, '1995-09-12', 6, NULL),
('Mia', 'Thompson', 5.5, 130, 'Defender', 4, '1996-11-03', 2, NULL),
('John', 'Soccer', 7.0, 180, 'Forward', 1, '1996-11-03', 150, 10);

INSERT INTO "coach" (first_name, last_name, years_of_experience, salary, email, phone_number, team_id)
VALUES 
-- Coaches for The Warriors (team_id = 1)
('Mike', 'Johnson', 15, 78000.00, 'mike.johnson@example.com', '123-456-7890', 1),
('Emily', 'Harris', 8, 65000.00, 'emily.harris@example.com', '123-456-7899', 1), 

-- Coaches for The Sharks (team_id = 2)
('Sarah', 'Parker', 10, 67000.00, 'sarah.parker@example.com', '123-456-7891', 2),
('James', 'Evans', 12, 72000.00, 'james.evans@example.com', '123-456-7892', 2),

-- Coaches for The Eagles (team_id = 3)
('David', 'Lee', 12, 71000.00, 'david.lee@example.com', '123-456-7893', 3),

-- Coaches for The Dragons (team_id = 4)
('Olivia', 'Carter', 6, 59000.00, 'olivia.carter@example.com', '123-456-7894', 4),
('Daniel', 'Walker', 9, 64000.00, 'daniel.walker@example.com', '123-456-7895', 4), 

-- Coaches for The Panthers (team_id = 5)
('Matthew', 'Turner', 11, 70000.00, 'matthew.turner@example.com', '123-456-7896', 5),
('Grace', 'Nelson', 5, 56000.00, 'grace.nelson@example.com', '123-456-7897', 5),

-- Coaches for The Thunder (team_id = 6)
('Lucas', 'Scott', 13, 74000.00, 'lucas.scott@example.com', '123-456-7898', 6),

-- Coaches for The Lions (team_id = 7)
('Laura', 'Martin', 8, 62000.00, 'laura.martin@example.com', '123-456-7899', 7),

-- Coaches for The Titans (team_id = 8)
('Peter', 'Garcia', 14, 82000.00, 'peter.garcia@example.com', '123-456-7890', 8),
('Rachel', 'Roberts', 5, 59000.00, 'rachel.roberts@example.com', '123-456-7891', 8), 
('Jonathan', 'Lopez', 16, 83000.00, 'jonathan.lopez@example.com', '123-456-7894', 8),

-- Coaches for The Rockets (team_id = 9)
('Anthony', 'Young', 5, 56000.00, 'anthony.young@example.com', '123-456-7892', 9),
('Samantha', 'Phillips', 7, 63000.00, 'samantha.phillips@example.com', '123-456-7893', 9),
('Sophia', 'Cooper', 9, 61000.00, 'sophia.cooper@example.com', '123-456-7895', 9), 

-- Coaches for The Bears (team_id = 10)

-- Coaches without a team (team_id = NULL)
('Samantha', 'King', 6, 60000.00, 'samantha.king@example.com', '123-456-7896', NULL),
('Kevin', 'Perez', 6, 61000.00, 'kevin.perez@example.com', '123-456-7897', NULL);