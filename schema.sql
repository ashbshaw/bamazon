DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;
USE bamazonDB;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Best Choice Patio Set", "Patio, Lawn & Garden", 150.99, 20), ("AmazonBasics Fire Pit", "Outdoor Heating & Cooling", 99.50, 15), 
("YETI Cooler", "Outdoor Recreation", 249.99, 45), ("JBL Portable Speaker", "Electronics", 79.95, 75), ("Yard Games Giant Jenga", "Toys & Games", 49.99, 36), 
("Repel Citronella Candle", "Patio, Lawn & Garden", 6.49, 75), ("Thermos Can Insulator", "Outdoor Recreation", 9.97, 67), ("Best Choice Patio Umbrella", "Patio, Lawn & Garden", 39.99, 5),
("CUPSHE Women's Bikini", "Sports & Fitness", 32.99, 22), ("Inflatable Flamingo Float", "Toys & Games", 39.99, 17);