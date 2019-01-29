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

    ManagerMenu();
});
//return menu for managerial controls
function ManagerMenu() {
    inquirer.prompt([{
        type: "list",
        message: "Choose one of the following:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "action"
    }]).then(function (answer) {
        switch (answer.action) {
            case "View Products for Sale":
                viewProductsForSale();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        }
    })
}
//shows all inventory.
function viewProductsForSale() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log('-------------Inventory---------------');
        for (var i = 0; i < results.length; i++) {

            console.log(`ID: ${results[i].item_id}\nItem Name: ${results[i].product_name}\nDepartment: ${results[i].department_name}\nStock: ${results[i].stock_quantity}\nPrice: $${results[i].price}`);
        }
        inquirer.prompt([{
            type: "confirm",
            message: "Return?",
            name: "confirm"
        }]).then(function (answer) {
            if (answer.confirm) {
                ManagerMenu();
            } else {
                console.log("Have a Nice Day");
            }
        })
    })
}

//Allows you to look at all items with fewer that 5 remaining
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function (err, results) {
        if (err) throw err;
        if (results[0] === undefined) {
            console.log("No low inventory.");
            ManagerMenu();
        } else {
            for (var i = 0; i < results.length; i++) {
                console.log(`ID: ${results[i].item_id}\nItem Name: ${results[i].product_name}\nDepartment: ${results[i].department_name}"\nStock: ${results[i].stock_quantity}\nPrice: $"${results[i].price}`);
            }
            ManagerMenu();
        }
    })
}
///this breaks after adding the items for some reason I cannot figure out.
function stockInventory(item) {
    inquirer.prompt([
        {
            type: "input",
            message: "Quantity?",
            name: "quantity"
        }
    ]).then(function (answer) {
        var input = parseInt(answer.quantity);

        if (input <= 0) {
            console.log("Insufficient Quantity.");
        } else {
            console.log("Restock Successful!");
            var newQuantity = item_id.stock_quantity + input;

            connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: newQuantity
                }, {
                    item_id: item.item_id
                }
                ], function (err, results) {
                    if (err) throw err;
                    inquirer.prompt([{
                        type: "confirm",
                        message: "Return?",
                        name: "confirm"
                    }]).then(function (answer) {
                        if (answer.confirm) {
                            ManagerMenu();
                        } else {
                            console.log("Thank you for shopping with us.");
                        }
                    })
                }
            );
        }
    })
}
//allows you to choose which item to add stock to, then directs to the stock inventory function
function addToInventory() {
    inquirer.prompt([{
        type: "input",
        message: "Id of the item",
        name: "id"
    }]).then(function (item) {
        connection.query("SELECT * FROM products WHERE ?",
            [{
                item_id: item.item_id
            }], function (err, results) {
                if (err) throw err;
                var product_name = results[0];
                console.log("You selected: ");
                stockInventory(product_name);
            }
        );
    })
}
//allows addition of new items to the database
function addNewProduct() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Name of item you want to add"
    }, {
        name: "department",
        type: "input",
        message: "Department of new item?"
    }, {
        name: "price",
        type: "input",
        message: "Cost of item?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }, {
        name: "stock",
        type: "input",
        message: "Quantity of the item?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.item,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.stock
            },
            function (err) {
                if (err) throw err;
                console.log("Item Added!");

                ManagerMenu();
            }
        );
    });
}