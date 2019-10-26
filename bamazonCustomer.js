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
      message: "What is the item ID of the product would you like to purchase?[Quit with Q]"
    }]).then(function(answer){
      var correct = false;
      if(answer.choice.toUpperCase()=="Q"){
        process.exit();
      }
      for (var i = 0; i < res.length; i++){
        if(res[i].item_id===parseInt(answer.choice)){
          correct = true;
          var product = parseInt(answer.choice);
          var id = i;
          inquirer.prompt({
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
          }).then(function(answer){
            if (product >= res[id].stockquantity) {
              connection.query(`UPDATE products 
                SET stockquantity = ` + String(res[id].stockquantity - answer.quantity) +
                " WHERE id = " + res[id].id + ";",
                  function (err, res2) {
                    if (err) throw err;
                    console.log("\n-----------------------------\n"
                    +"Your total is $" + (res[id].price * answer.quantity) + ". Thank you for your purchase!");
                  showitems();
                  })
            } else{
              console.log("Insufficient Quantity!");
              promptcustomer(res);
            }
          })
        }
      }
      if(i==res.length && correct == false){
        console.log("Not a valid selection!");
        promptcustomer(res);
      }
    })
  }