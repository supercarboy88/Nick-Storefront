DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INTEGER(10) NULL,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stockquantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (20123, "iPhone 11", "electronic", 800, 100);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (30121, "T-shirt", "clothes", 30, 100);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (20156, "battery", "electronic", 300, 10);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (40110, "hat", "chothes", 800, 100);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (20158, "playstation 5", "electronic", 800, 100);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (50163, "basketball", "sports", 800, 100);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (50125, "soccer", "sports", 800, 100);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (20199, "ipad 5", "electronic", 900, 100);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (40156, "pants", "clothes", 80, 100);

INSERT INTO products (item_id, product_name, department_name, price, stockquantity)
VALUES (40896, "jeans", "clothes", 85, 100);