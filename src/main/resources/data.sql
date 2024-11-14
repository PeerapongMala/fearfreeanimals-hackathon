-- Insert roles only if the table is empty
INSERT INTO roles (name)
SELECT 'GENERAL' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'GENERAL');

INSERT INTO roles (name)
SELECT 'PATIENT' WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'PATIENT');

-- Insert users
INSERT INTO users (username, password, role_id, access_code, fear_level, coins)
VALUES
('john_doe', 'password123', (SELECT id FROM roles WHERE name = 'GENERAL'), NULL, 10, 100),
('jane_doe', 'password456', (SELECT id FROM roles WHERE name = 'PATIENT'), 'FFANM001', 20, 200);

-- Insert assessments
INSERT INTO assessments (user_id, score, fear_percentage)
VALUES
(1, 85, 85.0),
(2, 90, 90.5);

-- Insert game progress
INSERT INTO game_progress (user_id, animal_type, current_level, completed)
VALUES
(1, 'CAT', 1, FALSE),
(2, 'DOG', 10, TRUE);

-- Insert rewards
INSERT INTO rewards (name, description, coin_cost)
VALUES
('Ice Cream', 'Strawberry ice cream', 3),
('Zoo Voucher', 'Voucher for zoo entry', 6);

-- Insert reward redemptions
INSERT INTO reward_redemptions (user_id, reward_id, redeemed_at)
VALUES
(1, 1, CURRENT_TIMESTAMP),
(2, 2, CURRENT_TIMESTAMP);
