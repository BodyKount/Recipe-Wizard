DROP DATABASE IF EXISTS users_db;

CREATE DATABASE users_db;

\c users_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY INTEGER,
    userName VARCHAR(30) NOT NULL UNIQUE
        CHECK (LENGTH(username) >= 3 AND LENGTH(username) <= 30),
    password VARCHAR(50) NOT NULL,
    role role_type DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE role_type AS EUM ('user', 'admin');
