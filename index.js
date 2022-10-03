const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
let errorHandler = require("./utils").errorHandler;
//const config = require("./config.json");
//-------------------------------------
let app = express();
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
//let port = process.env.PORT || config.port;
//-------------------------------------
let Hero = mongoose.model("Hero",Schema({
    id : ObjectId,
    title : String,
    firstname : String,
    lastname : String
}));
//-------------------------------------
let dbstring="mongodb+srv://admin:VrThw6mh99YoOrdV@cluster0.of0wu18.mongodb.net/valtech?retryWrites=true&w=majority";
mongoose.connect(dbstring)
.then(res=>console.log("DB Connected"))
.catch(error=>errorHandler);
//-------------------------------------
app.use(express.static(__dirname+"/public"));
app.use(express.json());
//-------------------------------------
// READ
app.get("/data", (req, res)=>{
    Hero.find().then(dbres=>res.json(dbres))
});
setTimeout(function(){
 
},2000);
 
// CREATE
app.post("/data", (req, res)=>{
    let hero = new Hero(req.body);
    console.log(req.body);
    hero.save()
    .then(dbres=>{
        res.send({ message : "hero added to list"})
        console.log("db updated")
    })
    .catch(err=>errorHandler);
});
// UPDATE
app.post("/update/:hid", (req, res)=>{
    console.log("update request recived")
   Hero.findByIdAndUpdate({_id : req.params.hid})
  .then(dbRes=>{
    console.log(dbRes);
        dbRes.title = req.body.title;
        dbRes.firstname = req.body.firstname;
        dbRes.lastname = req.body.lastname;
        dbRes.save().then(updateRes=>res.send({ message : "hero info updated"} ))
  })
  .catch(error=>errorHandler);
})
// READ UPDATE
app.get("/edit/:heroid", (req, res)=>{
    Hero.findById({ _id : req.params.heroid }).then(dbres => {
        res.send(dbres)
    })
})
// DELETE
app.delete("/delete/:hid",(req, res)=>{
    // console.log(  );
    Hero.findByIdAndDelete({ _id : req.params.hid })
    .then(dbRes => res.send({ message : "hero deleted", hero : dbRes.title}))
});
//-------------------------------------
app.listen(5050,"localhost",errorHandler);
console.log("server is now ready on localhost:5050")
//-------------------------------------