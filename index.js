const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;
const port = 5000;

//middlewear 
app.use(cors());
app.use(bodyParser.json());

//database 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8acpe.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

app.get("/",(req,res)=>{
    res.send("our app is running yay")
})





client.connect(err => {
  const collection = client.db("power_x_gym").collection("services");
  
  app.use("/class",(req,res)=>{
      collection.find({})
      .toArray((err,document)=>{
          res.send(document)
      })
  })

  app.use("/getservice",(req,res)=>{
      const title = req.query.title;
      collection.find({title:title})
      .toArray((err,document)=>{
          res.send(document)
      })
  })
  
});


app.listen(process.env.PORT||port)
