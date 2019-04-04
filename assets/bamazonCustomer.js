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
    console.log("connection id : " + connection.threadId);
    list();
});


function list() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id} \nProduct: ${res[i].product_name} \nDepartment: ${res[i].department_name} \nPrice: $${res[i].price} \nStock Quantity: ${res[i].stock_quantity}`);
            console.log(`---------------------------------`);
        }
        start();
    });
};

function start() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the ID number of the item you would like to purchase.",
                name: "id"

            },
            {
                type: "input",
                message: "How many would you like purchase?",
                name: "quantity"
            },
        ]).then(function (answer) {
            // var userInput;
            var originalQuantity;
            var query = "SELECT id, product_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { id: answer.id }, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log("You have chosen ID:" + res[i].id + ", " + res[i].product_name + ", $" + res[i].price)
                    originalQuantity = res[i].stock_quantity;
                    newQuantity = (res[i].stock_quantity - answer.quantity);
                    var total = (answer.quantity * res[i].price);
                    // console.log(originalQuantity);
                    // console.log(res[i]);
                }
                if (originalQuantity >= answer.quantity) {
                    var query = "UPDATE products SET ? WHERE?"
                    connection.query(query, [{ stock_quantity: newQuantity }, { id: answer.id }], function (err, res) {
                        if (err) throw err;
                        console.log(`Your total is: $${total}.`);
                        start();
                    });
                } else {
                    console.log(`Sorry! Not enough in stock.`);
                    start();
                }

            });
        })
}


