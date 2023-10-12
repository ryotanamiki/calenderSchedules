CREATE DATABASE calendersche_db;
use calendersche_db;

CREATE Table schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    user VARCHAR(255) NOT NULL,
    content TEXT
);