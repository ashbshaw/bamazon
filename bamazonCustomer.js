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
    selectProducts(res);
  });


  //connection.end();
}

// Two user prompts: 1) ask ID of product they want to buy, 2) ask how many units they want to buy
function selectProducts(inventory) {
  inquirer.prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID of the product you would like to purchase?\n"
      // add validation
    },
    {
      name: "quantity",
      type: "input",
      message: "How many would you like to purchase?\n"
      // add validation
    }

  ]).then(function (answer) {
    console.log("Updating product stock...\n");
    // trying to connect chosen product with database and not sure how to proceed
    var chosenProduct;
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === parseInt(answer.id)) {
        chosenProduct = inventory[i];
      }
    }

    if (!chosenProduct) {
      console.log("Sorry, we do not carry that item.");
      startOver()
    }
    // After order is placed, check to see if enough inventory. 
    if (chosenProduct){

      if (chosenProduct.stock_quantity >= parseInt(answer.quantity)) {
        connection.query(
          "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
          [
            answer.quantity, chosenProduct.item_id
          ],

          function (err) {
            if (err) throw err;
            console.log("Thank you for purchasing" + chosenProduct.product_name + ". You have purchased " + answer.quantity + ".");
            startOver()
          }
        );
      } else {
        console.log("We do not have that many.");
        startOver()
      }
    }
  })
}

// If not, notify with alert.
// If so, fulfill the order: 1) update database with new quantity, 2) display total cost of purchase

function startOver() {
  inquirer.prompt([
    {
      name: "confirm",
      type: "confirm",
      message: "Would you like to purchase another item?"
    }

  ]).then(function (answer) {
    if (answer.confirm) {
      displayProducts()
    } else {
      console.log("Thank you for shopping at Bamazon. Have a great day.");
      process.exit()
    }
  })
}
