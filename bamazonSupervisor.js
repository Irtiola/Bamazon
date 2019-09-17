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

                    newDepartmentPrompt();
                    break;

                default:
                    // code block

                    break;
            }


        });
}
whatsuperviserWantToDo();

function productSalesByDepartment() {
    connection.query("select d.department_id, d.department_name, d.over_head_costs, ifnull(SUM(p.product_sales),0) as product_sales, ifnull(SUM(p.product_sales) - d.over_head_costs,0) as total_profit from departments d left join products p on d.department_name = p.department_name GROUP BY d.department_id, d.department_name, d.over_head_costs", function (error, resp) {
        console.table(resp);
        whatsuperviserWantToDo();
    })
}

function createNewDepartment(department_name, over_head_costs) {
    connection.query("insert into Departments(department_name,over_head_costs) VALUES(?,?)", [department_name, over_head_costs], function (err, result) {
        if (err) throw err;
        console.table(result);
        whatsuperviserWantToDo();
    })
}

function newDepartmentPrompt(department_name, over_head_costs) {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What department name?",
                name: "department_name"
            },
            {
                type: "input",
                message: "What number for over_head_costs?",
                name: "over_head_costs"
            },
        ])
        .then(d => {
            createNewDepartment(d.department_name, d.over_head_costs);
        });
}

