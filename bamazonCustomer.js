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
  displayProducts();
});

// Display all the items available for sale
function displayProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    // Log all results 
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
      console.log('------------------------------------------------------------------------------------------------------------')
    }
  });
  
  selectProducts();
  //connection.end();
}

// Two user prompts: 1) ask ID of product they want to buy, 2) ask how many units they want to buy
function selectProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "What is the ID of the product you would like to purchase?\n"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?\n"
      }

    ]).then(function (answer) {
      function updateProduct() {
        console.log("Updating product stock...\n");
        // trying to connect chosen product with database and not sure how to proceed
        var chosenProduct;
        for (var j = 0; j < res.length; j++) {
          if (res[j].product_name === answer.id) {
            chosenProduct = res[j];
          }
        }

        if (chosenProduct.stock_quantity > parseInt(answer.quantity))
          var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            // Stuck
            [
              {
                stock_quantity: -1
              },
            ],
            function (err, res) {
              console.log(res.affectedRows + " product updated!\n");
            }
          );

        // Logs the actual query being run THIS IS IMPORTANT SO YOU CAN SEE THE WHOLE THING
        console.log(query.sql);
      }

    })
  })


}



  // After order is placed, check to see if enough inventory. 
  // If not, notify with alert.
  // If so, fulfill the order: 1) update database with new quantity, 2) display total cost of purchase
