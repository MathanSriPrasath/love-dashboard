-- Sample Data for Love Dashboard
-- Modify these values according to your actual couple information

USE love_dashboard;

-- Insert sample couple data (CHANGE THESE VALUES TO REAL DATA)
INSERT INTO couples (
    anniversary_date, 
    her_name, 
    her_date_of_birth, 
    her_bio, 
    her_favorite_quote,
    his_name, 
    his_date_of_birth, 
    his_bio, 
    his_favorite_quote,
    couple_photo_url
) VALUES (
    '2020-02-14',  -- Anniversary date (YYYY-MM-DD)
    'Sarah',        -- Her name
    '1995-05-20',   -- Her date of birth
    'A beautiful soul who loves reading, painting, and long walks on the beach.',
    'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.',
    'John',         -- His name
    '1993-08-15',   -- His date of birth
    'A passionate photographer who enjoys hiking, cooking, and making Sarah smile.',
    'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.',
    'https://example.com/photos/couple.jpg'  -- URL to couple photo
);

-- Insert sample love letters
INSERT INTO love_letters (couple_id, title, content, author, letter_date) VALUES
(1, 'Our First Date', 'I still remember the way you smiled when we first met. That moment changed my life forever...', 'John', '2020-02-14'),
(1, 'Happy Anniversary!', 'Three years together and every day feels like a blessing. Thank you for being my everything...', 'Sarah', '2023-02-14');

-- Insert sample memories
INSERT INTO memories (couple_id, title, description, memory_date, image_url, location, tags) VALUES
(1, 'Paris Trip 2021', 'Our magical week in Paris. We visited the Eiffel Tower and had the best croissants ever!', '2021-06-15', 'https://example.com/photos/paris.jpg', 'Paris, France', 'vacation,europe,romantic'),
(1, 'Hiking in Yosemite', 'An adventurous day hiking through beautiful trails. We reached the summit at sunset.', '2022-07-20', 'https://example.com/photos/yosemite.jpg', 'Yosemite National Park', 'hiking,nature,adventure');

-- Insert sample important dates
INSERT INTO important_dates (couple_id, title, description, event_date, category, is_recurring) VALUES
(1, 'Our Anniversary', 'The day we officially became a couple', '2020-02-14', 'anniversary', true),
(1, 'Sarah\'s Birthday', 'Her special day!', '1995-05-20', 'birthday', true),
(1, 'John\'s Birthday', 'His special day!', '1993-08-15', 'birthday', true),
(1, 'Trip to Italy', 'Our planned vacation to Rome and Venice', '2024-09-10', 'special', false);

