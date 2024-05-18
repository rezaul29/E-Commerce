const mongoose =require('mongoose');

var mongoURL = "mongodb+srv://rez:12345@cluster0.cehnmsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect( mongoURL,{useUnifiedTopology:true, useNewUrlParser:true});

var db=mongoose.connection;


db.on('connected', ()=>{ console.log("Connection established ");})
db.on('error', ()=>{console.log("FAILED")})

module.exports = mongoose