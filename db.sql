CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email_address VARCHAR(255),
    phone_number VARCHAR(10),
    password VARCHAR(25),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zipcode VARCHAR(6),
    role VARCHAR(255),
    token VARCHAR(255)
);

INSERT INTO users(first_name,last_name,email_address,phone_number,password,address_line1,address_line2,city,state,zipcode,role,token) 
VALUES ('Abdullah','Shaikh','abdullahshhaikh10@gmail.com','7208283497','123456789','qqqq','qqqqq','Mumbai','Maha','400102','Admin','');