# assignment10-bamazon
a node &amp; MySQL CLI false storefront app 

This activity was the creation of an amazon-likestorefront using MySQL with a node CLI interface.

To run this application, you will require an active MySQL server with port 3006 open, and the username and passwrd set to "root.

clone the repository down, NPM install, the install the schemabamazon.sql data into MySQL.

you can run either node bamazonCustomer.js or node bamazonManager.js for different functionality over the same database.

#bamazonCustomer.js 
presents the user with a full list of available product, their Price, and the ability to select them by their ID number. They will then have the option of choosing the quantity, and after will be presented with the order details compsed of the Name of the product, the quantity purchased, and the total amount spent, and then will return to the item list for further purchases.

![bamazonCustomer1](/readme_images/1.jpg)

If the user attempts to purchase more of an item than the store currently posseses, the order will be rejected

![bamazonCustomer2](/readme_images/2.jpg)

#bamazonManager.js

presents the user with far more versatile control over the database itself, being able to look at more information (total quantities of all products, departments) and is also capable of both adding additional stock to pre-existing product, and adding new items to the database entirely. It also has an arrow selectable main menu.

![bamazonManager1](/readme_images/3.jpg)

Adding new products

![bamazonManager1](/readme_images/4.jpg)

Adding more stock to existing products

![bamazonManager1](/readme_images/5.jpg)

Programmed By Michael Bieniewicz-Valada using

#Technologies Used:

MySQL
Node.js
Inquirer