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

function allProducts() {
    connection.query('SELECT * FROM Products', function (error, results, fields) {
        if (error) throw error;
        console.log('---------')
        console.log('---------')
        console.log('-----Products();----')
        console.log(results);
        console.log('---------')

    });
};
allProducts();
// function findCarBasedOnId(cid) {
//     //we use the ?'s to avoid a sql injection attack
//     //it'll take cid and it'll escape it and then run it
//     //escaped means - it's forced to be a string - it's not going to be ran as sql - it's going to be ran as a string
//     //the attacker will try to write sql in html forms 

//     //cid => ; DELETE FROM people
//     connection.query('SELECT * FROM cars WHERE id = ?', [cid], function (error, results, fields) {
//         if (error) throw error;
//         console.log('---------')
//         console.log('---------')
//         console.log('- ----findCarBasedOnId(1);----')
//         console.log(results);
//         console.log('---------')

//     });
// }

// function insertCar(carName) {
//     connection.query('INSERT INTO cars (car_name) VALUES (?)', [carName], function (error, results, fields) {
//         if (error) throw error;
//         console.log('---------')
//         console.log('---------')
//         console.log('-----insertCar(carName);----')
//         console.log(results);
//         console.log('---------')

//         whatDoYouWantToDo();
//     });
// }

// function updateCarName(carName, cid) {
//     connection.query('UPDATE cars SET car_name = ? WHERE id = ?', [carName, cid], function (error, results, fields) {
//         if (error) throw error;
//         console.log('---------')
//         console.log('---------')
//         console.log('-----updateCarName(carName, cid);----')
//         console.log(results);
//         console.log('---------')
//         whatDoYouWantToDo();
//     });
// }

// function deleteCar(cid) {
//     connection.query('DELETE FROM cars WHERE id = ?', [cid], function (error, results, fields) {
//         if (error) throw error;
//         console.log('---------')
//         console.log('---------')
//         console.log('-----deleteCar(cid);----')
//         console.log(results);
//         console.log('---------')
//     });
// }




// findCarBasedOnId(1);

// insertCar('blah blah blah')

// updateCarName('sdfsdfs', 10) 

// allCars();

// deleteCar(10)

// // allCars();

// whatDoYouWantToDo();

// function insertCarPrompt() {
//     inquirer
//         .prompt([

//             {
//                 type: "input",
//                 message: "give a car name?",
//                 name: "car_name"
//             },
//         ])
//         .then(function (resp) {
//             insertCar(resp.car_name);
//         });
// }
// function updateCarPrompt() {
//     inquirer
//         .prompt([

//             {
//                 type: "input",
//                 message: "give a NEW car_name?",
//                 name: "car_name"
//             },
//             {
//                 type: "input",
//                 message: "what car id?",
//                 name: "car_id"
//             },
//         ])
//         .then(function (resp) {
//             updateCarName(resp.car_name, resp.car_id);
//         });
// }

// function deleteCarPrompt() {
//     inquirer
//         .prompt([

//             {
//                 type: "input",
//                 message: "what car_id?",
//                 name: "car_id_del"
//             },
//         ])
//         .then(function (resp) {
//             deleteCar(resp.car_id_del);
//         });
// }
// function whatDoYouWantToDo() {
//     inquirer
//         .prompt([{
//             type: "list",
//             message: "what do you want to do?",
//             choices: ["show all cars", "show one car", "insert a car", "update a car", "delete a car", "quit"],
//             name: "what_to_do"
//         }
//         ])
//         .then(function (resp) {
//             switch (resp.what_to_do) {
//                 case "show all cars":
//                     allCars();
//                 case "insert a car":
//                     insertCarPrompt();
//                     break;
//                 case "update a car":
//                     // code block
//                     updateCarPrompt();
//                     break;
//                 case "delete a car":
//                     deleteCarPrompt();
//                     break;
//                 case "quit":
//                     console.log('later');
//                     connection.end();
//                     break;
//                 default:
//                     // code block
//                     allCars();
//                     break;
//             }


//         });
// }



