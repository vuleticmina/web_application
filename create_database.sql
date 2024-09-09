DROP DATABASE IF EXISTS your_imagination_your_garden;
CREATE DATABASE IF NOT EXISTS your_imagination_your_garden;
USE your_imagination_your_garden;



CREATE TABLE company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    services TEXT NOT NULL, 
    map_location VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    vacations TEXT
);


CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(1) NOT NULL CHECK (gender IN ('M', 'F')),
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    profile_picture LONGBLOB,
    credit_card_number VARCHAR(20),
    role VARCHAR(10) NOT NULL CHECK (role IN ('OWNER', 'DECORATOR', 'ADMIN')), 
    registration_status VARCHAR(10) NOT NULL DEFAULT 'PENDING' CHECK (registration_status IN ('PENDING', 'APPROVED', 'REJECTED', 'INACTIVE')),
    company_id INT,
    FOREIGN KEY (company_id) REFERENCES company(company_id)
);



CREATE TABLE arranging (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL, 
    company_id INT NOT NULL, 
    decorator_id INT,
    booking_datetime DATETIME NOT NULL,
    realisation_date DATETIME NOT NULL,
    last_servicing_date DATETIME,
    area DECIMAL(10, 2) NOT NULL,
    type VARCHAR(15) NOT NULL CHECK (type IN ('restaurant', 'private')),
    pool_area DECIMAL(10, 2),
    green_area DECIMAL(10, 2),
    fountain_area DECIMAL(10, 2),
    furniture_area DECIMAL(10, 2),
    tables_number INT,
    chairs_number INT,
    additional_requirements TEXT,
    layout TEXT,
    options TEXT,
    status VARCHAR(15) CHECK(status IN ('BOOKED', 'CANCELED', 'IN_PROCESS', 'COMPLETED', 'REJECTED')) DEFAULT 'BOOKED',
    servicing_status VARCHAR(15) CHECK(servicing_status IN ('BOOKED', 'ACCEPTED', 'REJECTED')) DEFAULT 'ACCEPTED',
    rating TINYINT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    rejection_comment TEXT,
    picture LONGBLOB,
    FOREIGN KEY (owner_id) REFERENCES user(user_id),
    FOREIGN KEY (decorator_id) REFERENCES user(user_id),
    FOREIGN KEY (company_id) REFERENCES company(company_id)
);











