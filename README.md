# bamazon
SQL database code:
`DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (50),
	department_name VARCHAR(50),
	price DECIMAL(10,2),
	stock_quantity INT,
	PRIMARY KEY (id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Barbie", "toys", 14.99, 100),
("iPhone Screen Protector", "Electronics", 1.99, 500),
("Weighted Blanket", "Home Goods", 50.00, 150),
("Humidifier", "Home Goods", 25.95, 60),
("Blackout Curtains", "Home Goods", 60.00, 20),
("Salt and Vinegar Chips", "Food", 3.95, 1000),
("Plunger", "Home Goods", 5.99, 600),
("Nitendo Switch", "Electronics", 450, 50),
("Headphones", "Electronics", 11.95, 10);

SELECT * FROM products`

![Image of the over sql]

(./assets/images/sqltable.png)


Level One Outcomes: 

![list of items for sale]

(./assets/images/itemsForSale.png)


![Example 1]

(./assets/images/level1Example1.png)


![Example 2]

(./assets/images/level1Example2.png)


![Image of sql update]

(./assets/images/level1SequelScreenshot.png)



Level Two Outcomes:

![Image of inquirer]

(./assets/images/level2ShowInquirer.png)


![screenshot of inventory]

(./assets/images/level2ShowInventory.png)


![Adding quantity to the inventory]

(./assets/images/addingToInventory.png)

(./assets/images/addingToInventorySQL.png)

Resulted in a null value in the table.


![Adding a new product]

./assets/images/addProductToInventory.png

Resulted in nulls.
