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


function whatsuperviserWantToDo() {
    inquirer
        .prompt([{
            type: "list",
            message: "what do you want to do?",
            choices: ["View Sales by Department", "Create new Department"],
            name: "what_to_do"
        }
        ])
        .then(function (resp) {
            switch (resp.what_to_do) {
                case "View Sales by Department":
                    //function
                    productSalesByDepartment();
                    break;
                case "Create new Department":
                    //function
                    break;

                default:
                    // code block

                    break;
            }


        });
}
whatsuperviserWantToDo();

function productSalesByDepartment() {
    connection.query("")
}