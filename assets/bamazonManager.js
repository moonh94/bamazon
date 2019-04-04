var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connection id: " + connection.threadId);
    start();
})

function start() {
    inquirer.
        prompt(
            {
                type: "list",
                message: "Select from the following:",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                name: "menu"

            }
        ).then(function (answer) {
            if (answer.menu === "View Products for Sale") {
                list();
            }
            else if (answer.menu === "View Low Iventory") {
                lowInventory();
            }
            else if (answer.menu === "Add to Inventory") {
                add();
            }
            else if (answer.menu === "Add New Product") {
                addNew();
            }
        })
}


function list() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id} \nProduct: ${res[i].product_name} \nDepartment: ${res[i].department_name} \nPrice: $${res[i].price} \nStock Quantity: ${res[i].stock_quantity}`);
            console.log(`---------------------------------`);
        } start();
    })
}

function lowInventory() {
    var query = "SELECT stock_quantity FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 20) {
                console.log(`ID: ${res[i].id} \nProduct: ${res[i].product_name} \nDepartment: ${res[i].department_name} \nPrice: $${res[i].price} \nStock Quantity: ${res[i].stock_quantity}`);
                console.log(`---------------------------------`);
            }
        } 
    })
}


function add() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Insert ID of product to update",
                name: "increaseProduct"
            },
            {
                type: "input",
                message: "How much are you adding to the inventory?",
                name: "increaseInventory"
            }
        ]).then(function (answer) {
            var newQuantity; 
            var query = "UPDATE products SET ? WHERE ?";
            connection.query(query, [{stock_quantity: newQuantity}, { id: answer.increaseProduct }], function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                newQuantity = (res[i].stock_quantity + answer.increaseInventory);
                console.log(`Update Complete`);
                list();
             
                // (stock_quantity + answer.increaseInventory);
            }; 
        });
})
}

function addNew() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What product would you like to add?",
                name: "addProduct"
            },
            {
                type: "input",
                message: "What department does it belong to?",
                name: "addDepartment",
            },
            {
                type: "input",
                message: "How much is the product worth?",
                name: "addPrice",

            },
            {
                type: "input",
                message: "Quantity?",
                name: "addQuantity"
            },

        ]).then(function (answer) {
            var query = "INSERT INTO products SET ?";
            connection.query(query, [{ product_name: answer.addProduct}, {department_name: answer.addDepartment}, 
                {price: answer.addPrice}, {stock_quantity: answer.addQuantity}], function(err, res){
                    if (err) throw err;
                    console.log(res.affectedRows + "products updated!");
                }); list();
        }); 
     }

