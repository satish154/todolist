//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items=["buy food","cook food","eatfood"];
let workItems=[];
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res)
{
    let today=new Date();
    let options={
      weekDay:"Long",
      day:"numeric",
      month:"long"
    };
  let day=today.toLocaleDateString("en-US",options);
  res.render("list",{listTitle:day, newListItems:items});
});
app.post("/",function(req,res)
{
  let item=req.body.newItem;
  if(req.body.list=="work"){
     workItems.push(item);
     res.redirect("/work");
  }
  else{
    items.push(item);
  res.redirect("/");

  }
   
   
});
app.get("/work",function(req,res)
{
  res.render("list",{listTitle:"work List",newListItems:workItems});
});


let port=process.env.PORT;
if(port==null || port==""){
  port=3000;

}
app.listen(port,function(req,res) 
{
  console.log("Server started on port 3000");
});