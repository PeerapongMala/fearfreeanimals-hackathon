-- Insert roles
INSERT INTO roles (name) VALUES
('general'),
('patient');

-- Insert users
INSERT INTO users (username, password, role_id, access_code, fear_level, coins) VALUES
('john_doe', 'password123', 1, NULL, 10, 100),
('jane_doe', 'password456', 2, 'ACCESS123', 20, 200);

-- Insert assessments
INSERT INTO assessments (user_id, score, fear_percentage) VALUES
(1, 80, 80.0),
(2, 90, 90.5);

-- Insert game progress
INSERT INTO game_progress (user_id, animal_type, current_level, completed) VALUES
(1, 'cat', 3, FALSE),
(2, 'dog', 5, TRUE);

-- Insert rewards
INSERT INTO rewards (name, description, coin_cost) VALUES
('Gift Card', 'A $10 gift card', 50),
('T-Shirt', 'A branded T-shirt', 100);

INSERT INTO reward_redemptions (user_id, reward_id, redeemed_at)
VALUES
(1, 1, CURRENT_TIMESTAMP),
(2, 2, CURRENT_TIMESTAMP);
