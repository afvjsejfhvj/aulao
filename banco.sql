CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    profile VARCHAR(50) DEFAULT 'customer'
) 

CREATE TABLE issues (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status BOOLEAN DEFAULT false,
    responsible VARCHAR(150) NOT NULL,
    observations TEXT
)