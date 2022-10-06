const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.json()); //middlewares
app.use(express.static("public"));//find all static html fies in public directory
app.use(bodyParser.urlencoded({
    extended: true,
  })
);

//mongoose.connect("mongodb://localhost:27017/e-comm");
mongoose.connect("mongodb://localhost:27017/e-comm",{
     useNewUrlParser:true,
     useUnifiedTopology:true
});
var db = mongoose.connection;

db.on("error", () => console.log("error in connecting to database"));
db.once("open", () => console.log("connected to database"));

app.get("/", (req, res) => {
  /*res.send("hello from server")*/
  res.set({
    "Allow-access-Alllow-Origin": "*",
  });
  return res.redirect("index.html");
});

app.post("/signup", (req, res) => {
  var name = req.body.name;

  var password = req.body.password;

  var data = {
    "name": name,
   
    "password": password
  };
  res.render('signup',{data});

  
  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("recorded successfully");
    
    
  });
  return res.redirect("signup.ejs"); //to redirect to new page
  
});
app.listen(5000);
console.log("lstening on port 5000");
