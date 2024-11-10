INSERT INTO users (username, password, role, access_code, fear_level, coins)
VALUES
('john_doe', 'password123', 'general', NULL, 10, 100),
('jane_doe', 'password456', 'patient', 'ACCESS123', 20, 200);

INSERT INTO assessments (user_id, score, fear_percentage)
VALUES
(1, 80, 80.0),
(2, 90, 90.5);

INSERT INTO game_progress (user_id, animal_type, current_level, completed)
VALUES
(1, 'cat', 3, FALSE),
(2, 'dog', 5, TRUE);

INSERT INTO coins (user_id, balance, last_updated)
VALUES
(1, 100, CURRENT_TIMESTAMP),
(2, 200, CURRENT_TIMESTAMP);

INSERT INTO rewards (name, description, coin_cost)
VALUES
('Gift Card', 'A $10 gift card', 50),
('T-Shirt', 'A branded T-shirt', 100);

INSERT INTO reward_redemption (user_id, reward_id, redeemed_at)
VALUES
(1, 1, CURRENT_TIMESTAMP),
(2, 2, CURRENT_TIMESTAMP);