var mysql = require('mysql');

// Load the NPM Package inquirer
var inquirer = require("inquirer");
// mysql -u root -p
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon',
    port: 3306
});
connection.connect();
allProducts();
//function that will show all products
function allProducts() {
    connection.query('SELECT * FROM Products', function (error, results, fields) {
        if (error) throw error;
        console.log('--------------------------')
        console.log('--------ALLProducts-------')
        console.log(results);
        console.log('***************************')
        userChoicePrompt();
    });

};
//function that will update quantity for products after they were bought
function updateQuantity(iid, num_units) {
    connection.query('UPDATE Products SET stock_quantity = stock_quantity -? WHERE item_id = ?', [num_units, iid], function (error, results, fields) {
        allProducts();
        userChoicePrompt();
    });
};

//function that will compare user input with stock quantity  and based on result will proceed accordingly
function checkQuantity(num_units, iid) {
    connection.query('SELECT * FROM Products WHERE item_id = ?', [iid], function (error, results, fields) {
        if (error) throw error;
        if (parseInt(results[0].stock_quantity >= num_units)) {
            console.log('-----------------------------')
            console.log("Thank you for your order! Total cost is: " + num_units * results[0].price + "$");
            console.log('-----------------------------')
            updateQuantity(num_units, iid);
        } else {
            console.log("Insufficient Quantity!")
            console.log('******************************');
            allProducts();
            userChoicePrompt();

        };
    });

};

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

