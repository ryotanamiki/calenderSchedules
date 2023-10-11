-- Active: 1695798624080@@localhost@3306@calenderscheDb
CREATE TABLE schedules(  
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    user VARCHAR(255) NOT NULL,
    content TEXT
) COMMENT '';