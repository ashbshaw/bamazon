# **Bamazon**

## **Overview**
In this project, I creating a storefront through the use of newly-acquired MySQL skills. The app allows the user "customer" to select a product for purchase, and the store updates inventory accordingly. If there is not enough inventory, the store alerts the customer. I chose a backyard pool party theme because it's currently February, and this winter has been awful.

## **Project Instructions**
**Customer Interface**

1. Create a MySQL Database called Bamazon.
2. Then, create a table inside of that database called products.
3. The products table should have each of the following columns:
    - Item_id (unique id for each product)
    - Product_name (Name of product)
    - Department_name
    - Price (cost to customer)
    - Stock_quantity (how much of the product is available in stores)
4. Populate this database with around 10 different products (i.e. insert "mock" data rows into this database and table).
5. Then, create a Node application called bamazonCustomer.js. Running this application will first display all information about all of the items available for sale.
6. The app should then prompt users with two messages:
    - The first should ask them the ID of the product they would like to buy.
    - The second message should ask how many units of the product they would like to buy.
8. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
    - If not, the app should log a phase like Insufficient quantity!, and then prevent the order from going through.
    - If so, the app will fullfill the order and update the SQL database to reflect the remaining quantity.
9. Once the update goes through, show the customer the total cost of their purchase.

## **Technologies Used**
**NPM Installations**

Navigate to the root of your project. Then in the terminal command line run npm init, this will initalize a package.json for your project.
Include the following NPM installations: npm install mysql, npm install inquirer

**Programs**

MySQL Workbench
Node.js

**Connection to MySql Database**

You must create a connection between MySQL and Node using your MySQL password and database name.

![MySQL Connection Example](assets/images/connection.png)

## **Submission Screenshots**
**MySql Database**

Set up your MySQL Database as a first step.

![MySQL Database](assets/images/mysql.png)

**Bamazon**

"Display Products" will show all items available at Bamazon.

![Display Products](assets/images/products.png)

The user then selects the product they would like to purchase.

![Select Purchase](assets/images/purchase.png)

The database is updated based upon the quantity purchased. If there is not enough of the item, the user is notified.

The user has the opportunity to exit the store or shop for additional items after the transaction is completed.

![Select Purchase and Exit](assets/images/purchase2.png)

**Thank you for visiting my Bamazon project!**

## **Author**

**Ashley Shaw** - https://ashbshaw.github.io/Ashley-Shaw-Portfolio/
