// Require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

// npm init
// npm install mysql
// npm install inquirer

// Connect to the database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Phantogram1!",
  database: "bamazondb"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
  shop();
  connection.end();
});

// Display all the items available for sale
function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
      console.log('------------------------------------------------------------------------------------------------------------')
    }
  });
}

// Two user prompts: 1) ask ID of product they want to buy, 2) ask how many units they want to buy
function shop() {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID of the product you would like to purchase?\n"
      // validate??
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?"
      // validate??
    }
  ]).then(function (answer) {
    // var purchaseProduct =
    // var purchaseQuantity = 
    // var newTotal = 

    var query = "SELECT item_id, stock_quantity FROM products WHERE ?";
    connection.query(query, [answer.item_id, answer.stock_quantity], function (err, res) {
      // length is undefined
      //for (var i = 0; i < res.length; i++) {
      console.log(
        "You have selected" + answer.stock_quantity + " of item ID " + answer.item_id + "."
      )

    })
  })
}

  // After order is placed, check to see if enough inventory. 
  // If not, notify with alert.
  // If so, fulfill the order: 1) update database with new quantity, 2) display total cost of purchase