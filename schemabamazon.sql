DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT NULL,
product_sales INT,
PRIMARY KEY (item_id)

);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ROG Laptop", "Computers", 1250, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ipad Retina Display", "Computers", 750, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("JVC 234", "Televisions", 475, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tales of Vesperia", "Video Games", 49.99, 62);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Berserk TV", "Blu-RAY", 29.99, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Breakaway", "CD", 14.99, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Full Armor Gundam", "Models", 69.99,12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oreimo", "Novel", 13.99, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 248", "Televisons", 225.99, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Enter the Gungeon", "Video games", 25.00, 1000);
