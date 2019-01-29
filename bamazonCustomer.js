//required: mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    //servername
    host: "localhost",
    // Your port
    port: 3306,
    //Username
    user: "root",
    //User password
    password: "root",
    //database name schema create name, not the scema file itself
    database: "bamazon"
});


//Main connection, if it errors node out it returns the error, otherwise it starts the main application function
connection.connect(function (err) {
    if (err) throw err;

    ProductListing();
});

function ProductListing() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('');
        console.log('-------------Inventory---------------');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id}`);
            console.log('Product: ' + res[i].product_name);
            //removed per instructions  console.log('Department: ' + res[i].department_name);
            console.log('Price: ' + res[i].price);
            //removed per instructions  console.log('Quantity Remaining: ' + res[i].stock_quantity);
            console.log(' ');
        }
        userInterface()
    });
}

function userInterface() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw console.log("connection error:" + err);
        inquirer.prompt([
            {
                name: 'chooseId',
                type: 'input',
                message: 'Enter the id number of the product you want to purchase:',


            }, {
                name: 'amountPurchased',
                type: 'input',
                message: 'How many of that item do you wish to purchase?',
            }
        ]).then(function (answers) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answers.chooseId }, function (err, res) {

                var inStock = res[0].stock_quantity;
                var itemBought = answers.amountPurchased;

                if (inStock >= itemBought) {
                    var stillInStock = inStock - itemBought;

                    var totalPrice = res[0].price * itemBought;
                    var itemPurchased = res[0].product_name;

                    console.log(totalPrice + "  total price of items bought");

                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: stillInStock
                        }, {
                            item_id: answers.chooseId
                        }],
                        function (error) {

                            if (error) throw err;
                            console.log("==============================================");
                            console.log("Order details:");
                            console.log("Item bought " + itemPurchased);
                            console.log("Quanyity bought " + itemBought + " for $" + res[0].price);
                            console.log("Total Cost: $" + totalPrice);
                            console.log("\n\r");
                            console.log("Thank you for shopping with us.");
                            console.log("==============================================");
                            ProductListing();

                        }
                    );
                } else {
                    console.log("==============================================");
                    console.log("Not enough of that product");
                    console.log("==============================================");
                    ProductListing();
                }
            });
        });
    });
};