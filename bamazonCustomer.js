//required: mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    //servername
        host: "localhost",
    // Your port
        port: 3306,
    //Username
        user:"root",
    //User password
        password:"root",
    //database name schema create name, not the scema file itself
        database: "bamazon"
});


//Main connection, if it errors node out it returns the error, otherwise it starts the main application function
connection.connect(function (err) {
    if (err) throw err;

    userInterface();
});

function userInterface() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('');
        console.log('-------------Inventory---------------');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].item_id}`);
            console.log('Product: ' + res[i].product_name);
            console.log('Department: ' + res[i].department_name);
            console.log('Price: ' + res[i].price );
            console.log('Quantity Remaining: ' + res[i].stock_quantity);
            console.log(' ');

        }
    
    });
}