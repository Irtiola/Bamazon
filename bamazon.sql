create DATABASE bamazon;
create table Products
(
    item_id INT NOT NULL
    AUTO_INCREMENT, 
    product_name VARCHAR
    (255),
    department_name VARCHAR
    (255),
    price decimal
    (6,2) NOT NULL,
    stock_quantity decimal
    (6,0),
    PRIMARY Key
    (item_id)
    );


    insert into Products
        (product_name, department_name, price, stock_quantity)
    VALUES("avocado one large", "fresh", 2.69, 100),
        ("tomatoes, 1.5lb", "fresh", 2.22, 50),
        ("butter 1lb", "dairy", 4.14, 25),
        ("baby carrots", "fresh", 1.69, 50),
        ("evian", "beverages", 2.25, 85),
        ("salmon 1lb", "seafood", 10.43, 20),
        ("SeaPack shrimp", "seafood", 8.99, 15),
        ("Kombucha", "beverages", 2.99, 100),
        ("Bagel", "bread", 1.25, 80),
        ("Chiabatta", "bread", 4.99, 50);



    create table Departments
    (
        department_id INT NOT NULL,
        department_name VARCHAR(255),
        over_head_costs decimal(6,2) NOT NULL,
        PRIMARY KEY (department_id)

    );