
var stuff = require("dotenv").config();

var inquirer = require("inquirer");
const keys = require("./keys.js");
var mysql = require('mysql');
var connection = mysql.createConnection(stuff.parsed);
console.log(stuff.parsed);
//mysql -u root -p

allProducts();

//function that will show all products
function allProducts() {
    connection.query('SELECT * FROM Products', function (error, results) {
        if (error) console.log(error);
        console.log('--------------------------')
        console.log('--------ALLProducts-------')
        console.table(results);
        console.log('***************************')
        userChoicePrompt();
    });

};
//function that will compare user input with stock quantity  and based on result will proceed accordingly
function checkQuantity(num_units, iid) {
    connection.query('SELECT * FROM Products WHERE item_id = ?', [iid], function (error, results) {
        // if (error) throw error;
        console.log(results[0].stock_quantity);
        if (parseInt(results[0].stock_quantity) >= num_units) {
            console.log('---------------------------------------')
            console.log("|||||||||||||||||||||||||||||||||||||||")
            console.log("Thank you for your order! ");
            console.log("Order details: " + results[0].product_name + "*" + results[0].price);
            console.log("TOTAL COST IS: " + num_units * results[0].price + "$");
            console.log('---------------------------------------')
            console.log("---------------------------------------")
            updateQuantity(num_units, iid);
            updateProductSale(num_units, iid);
        } else {
            console.log("Insufficient Quantity!")
            console.log('---------------------------------------');
            startOverPrompt();


        };
    });

};
//function that will update quantity for products after they were bought
function updateQuantity(num_units, iid) {
    connection.query('UPDATE Products SET stock_quantity = stock_quantity -? WHERE item_id = ?', [num_units, iid], function (error, results, fields) {

        // startOverPromt();
    });
};
function updateProductSale(num_units, iid) {
    connection.query("UPDATE Products SET product_sales = product_sales + price * ? WHERE item_id = ?", [num_units, iid], function (err, res, fields) {
        startOverPrompt();
    });
}
//function that will show questions to user
function userChoicePrompt() {
    inquirer
        .prompt([

            {
                type: "input",
                message: "What is ID of the product that you would like to buy?",
                name: "product_id"
            },
            {
                type: "input",
                message: "How many units would you like to buy?",
                name: "num_units"
            },
        ])
        .then(userChoices => {
            checkQuantity(userChoices.num_units, userChoices.product_id);

        });

};

function startOverPrompt() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Do you want to buy something else?",
                name: "conf",
                default: true
            },
        ])
        .then(nextMove => {
            if (nextMove.conf) {
                allProducts();
            } else {
                console.log("Thank you for choosing Bamazon!")

            }
        });
}
