-- Active: 1695798624080@@localhost@3306@calenderSchedule
CREATE TABLE calenderSchedule(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    name VARCHAR(255),
    user VARCHAR(255),
    content TEXT,
    date DATE
) COMMENT '';

ALTER TABLE calenderSchedule RENAME TO schedules

ALTER TABLE schedules
RENAME COLUMN name TO title
