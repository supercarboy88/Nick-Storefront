var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "your password",
  database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    showitems();
  });
  
  function showitems() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      promptcustomer(res);
    });
  }

  var promptcustomer = function(res){
    inquirer.prompt([{
      type:'input',
      name:'choice',
      message: "What is the item ID of the product would you like to purchase?",
      validate: function (value) {
        if (isNaN(value) == false) {
            return true;
        } else {
            return false;
        }
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "How many would you like to purchase?",
      validate: function (value) {
          if (isNaN(value) == false) {
              return true;
          } else {
              return false;
          }
        }
      },
    ])
    .then(answers => {
      var selectedItem = res.filter(function (item) {
          return (item.item_id === parseInt(answers.choice));
      })
      if (parseInt(answers.quantity) <= selectedItem[0].stockquantity) {
          connection.query(`UPDATE products 
            SET stockquantity = ` + String(selectedItem[0].stockquantity - answers.quantity) +
            " WHERE id = " + selectedItem[0].id + ";",
              function (err, res) {
                if (err) throw err;
                console.log("\n-----------------------------\n\n"
                +"Your total is $" + (selectedItem[0].price * answers.quantity) + ". Thank you for your purchase!");
              showitems();
              })
      } else{
        console.log("Insufficient Quantity!");
        promptcustomer(res);
      }
    })
  }