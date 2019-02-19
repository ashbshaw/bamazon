// Require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

// npm init
// npm install mysql
// npm install inquirer

// Connect to the database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Phantogram1!",
    database: "bamazondb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    runSearch()
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }).then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    displayProducts()
                    break;

                case "View Low Inventory":
                    lowInventory()
                    break;

                case "Add to Inventory":
                    addInventory()
                    break;

                //   case "Add New Product":
                //     addNew();
                //     break;
            };
        });
};

// Display all the items available for sale
function displayProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results 
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
            console.log('------------------------------------------------------------------------------------------------------------');
        };
        runSearch()
    });
};

// WOULD LIKE TO ADD NOTIFICATION THAT NO INVENTORY MEETS THIS REQUEST
function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 50";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Low Inventory Items (<50)\n");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
            console.log('------------------------------------------------------------------------------------------------------------');
        };
        runSearch()
    });
};

// function addInventory() {
//     inquirer
//         .prompt([
//             {
//                 name: "input",
//                 type: "id",
//                 message: "Please enter the id of exiting inventory you would like to add."
//                 // Need to validate
//             },
//             {
//                 name: "input",
//                 type: "quantity",
//                 message: "How many of this item would you like to add?"
//                 // Need to validate
//             }
//         ]).then(function (answer) {
//             console.log("Updating inventory...\n");
//             var query = connection.query("UPDATE products SET ? WHERE ?",
//             [


//             ],
//             function (err, res) {
//                 console.log(res.affectedRows + " products updated!\n")
//             }

//             );
//             });
       
// }


