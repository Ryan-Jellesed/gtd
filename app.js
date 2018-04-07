// npm init
// npm install express --save

var express = require("express");

var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
  res.send(home.html);

});

app.get("*", function(req, res){
  res.send("Page Does Not Exist");
});


app.listen(3000);