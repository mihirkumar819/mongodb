const express=require("express");
const mongoose= require("mongoose");
const cors=require("cors");
let errorHandler=require("./utils").errorHandler;
// const config=require("./config.json");

let app=express();
let Schema=mongoose.Schema;
let ObjectId=Schema.ObjectId;
// let port=process.env.PORT|| config.port;

let dbstring="mongodb+srv://admin:VrThw6mh99YoOrdV@cluster0.of0wu18.mongodb.net/valtech?retryWrites=true&w=majority";
//let dbstring="mongodb+srv://${config.user}:${config.password}@cluster0.of0wu18.mongodb.net/valtech?retryWrites=true&w=majority";
mongoose.connect(dbstring).then(res=>console.log("db connected"))
 .catch(error=>errorHandler)

let Hero=mongoose.model("Hero",Schema({
    id:ObjectId,
    title:String,
    firstname:String,
    lastname:String
}));
app.use(express.json());
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    //res.send("hello from express")
    Hero.find().then(dbres=>res.json(dbres))


// });
// setTimeout(function(){
//     let hero=new Hero({
//         title:"mihir",
//         firstname:"kumar",
//         lastname:"valtech"
//     })
//     hero.save()
//     .then(res=>console.log("db updated"))
//     .catch(err=>errorHandler);
// },2000);
setTimeout(function(){
 
},2000);
 


// Create
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


// Update

app.post("/update/:hid", (req, res)=>{
    Hero.findByIdAndUpdate({_id : req.params.hid})
   .then(dbRes=>{
         dbRes.title = "Joker";
         dbRes.save().then(updateRes=>console.log("hero info updated "))
   })
   .catch(error=>errorHandler);
 })


app.listen(2525,"localhost",errorHandler);
console.log("server is now ready on localhost:2525")