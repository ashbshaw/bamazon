// Please disreagard this for homework: it is a work in progress.
// I tried to add it to .gitignore

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

// Prompts user to select what they would like to do
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
            // Switch function based upon user's choice
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

// Display items with inventory less than 50
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


// Allow user to add to existing inventory item
function addInventory() {
    inquirer
        .prompt([
            {
                name: "input",
                type: "list",
                message: "Please choose the ID of the item you would like to add.\n",
                choices: function () {
                    var choiceArray = [];
                    for (i = 0; i < data.length; i++) {
                        choiceArray.push(data[i].item_id);
                    };
                    return choiceArray;
                },
            },
            {
                name: "input",
                type: "quantity",
                message: "How many of this item would you like to add?"
            }
        ]).then(function (answer) {

            var chosen;
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                console.log("Selecting Inventory.\n");
                // Loops to find the id and information for specified inventory item
                for (var i = 0; i < res.length; i++) {
                    if (data[i].item_id === answer.addInventory) {
                        chosen = data[i];
                    };
                };
            });
            connection.query("UPDATE bamazon_products SET ? WHERE ?", function (err, res) {
                if (err) throw err;
                console.log("Updating Inventory.\n");

                Array.push("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
                console.log('------------------------------------------------------------------------------------------------------------');

            });

        })



    console.log("Updating inventory...\n");
    var query = connection.query("UPDATE products SET ? WHERE ?",
        [


        ],
        function (err, res) {
            console.log(res.affectedRows + " products updated!\n")
        }

    );
});

}


