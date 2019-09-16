// require("dotenv").config();
// Load the NPM Package inquirer
var inquirer = require("inquirer");
const keys = require("./keys.js");
var mysql = require('mysql');
var connection = mysql.createConnection(keys.data);
//mysql -u root -p
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon',
    port: 3306
});
connection.connect();


function whatManagerWantToDo() {
    inquirer
        .prompt([{
            type: "list",
            message: "what do you want to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to inventory", "Add new product"],
            name: "what_to_do"
        }
        ])
        .then(function (resp) {
            switch (resp.what_to_do) {
                case "View Products for Sale":
                    allProducts();
                    break;
                case "View Low Inventory":
                    checkLowestInventory();
                    break;
                case "Add to inventory":
                    // code block
                    updateProductInventoryPrompt();
                    break;
                case "Add new product":
                    insertNewProductPrompt();
                    break;

                default:
                    // code block
                    allProducts();
                    break;
            }


        });
}
whatManagerWantToDo();
//function for case "view products for sale"
function allProducts() {
    connection.query('SELECT * FROM Products', function (error, results) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('--------------------------')
            console.log('--------ALLProducts-------')
            console.table(results);
            console.log('***************************')
            whatManagerWantToDo();
        }
    });

};
//function for case "view low inventory"

function checkLowestInventory() {
    connection.query("SELECT * FROM Products WHERE stock_quantity<5", function (err, resp) {
        if (err) {
            console.log(err)
        } else {
            console.log("------------------------------")
            console.log("===> Low inventory products <===")
            console.log("------------------------------")
            console.table(resp);
            console.log("------------------------------");
        }
        whatManagerWantToDo();
    })
};

//function for case "add to inventory"
function updateProductInventory(iid, num_units) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [num_units, iid], function (err, res) {
        if (err) {
            console.log(err)
        } else {

            console.log("Updated! " + num_units + " " + iid);
            whatManagerWantToDo();
        }
    })
}
//function that will take manager's input and run add to inventory
function updateProductInventoryPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What product id?",
                name: "product_id"
            },
            {
                type: "input",
                message: "What number of units to add?",
                name: "num_units"
            },
        ])
        .then(x => {
            updateProductInventory(x.product_id, x.num_units);
        });
}
//function for case "add new product"

function insertNewProduct(product_name, department_name, price, stock_quantity) {
    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", [product_name, department_name, price, stock_quantity], function (err, res) {
        // if (err) throw error;
        console.log("Done! " + product_name + " " + department_name + " " + price + " " + stock_quantity);
        console.table(res);
        whatManagerWantToDo();
    })
}

function insertNewProductPrompt() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What product name?",
                name: "product_name"
            },
            {
                type: "input",
                message: "What department name?",
                name: "department_name"
            },
            {
                type: "input",
                message: "What is the price of a new product?",
                name: "price"
            },
            {
                type: "input",
                message: "What is stock quantity?",
                name: "inventory"
            },
        ])
        .then(newProduct => {
            insertNewProduct(newProduct.product_name, newProduct.department_name, newProduct.price, newProduct.inventory);
        });
}