//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: {
    type: String
  }
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- HIt this to cross an item."
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Added items");
//   }
// });

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {
const day = date.getDate()
console.log(day);
  Item.find({}, function(err, foundItems){
    if(foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Added items");
        }
      });
      res.redirect("/");
    } else {
    res.render("list", {listTitle: day, newListItems: foundItems});
    }
  });
});

app.get("/:customListName", function(req,res){
  const customListName = req.params.customListName;
});

app.post("/", async function(req, res){
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });
  
  await item.save();
  res.redirect("/");

});

app.post("/delete", async function(req,res){
  const itemDelNameID = req.body.delete;

  await Item.findByIdAndRemove(itemDelNameID, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted");
    }
  })
  res.redirect("/");
});


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(4000, function() {
  console.log("Server started on port 3000");
});


