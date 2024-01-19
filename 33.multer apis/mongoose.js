const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/API")
mongoose.connect("mongodb+srv://abhisheksolapure2003:OyG0KVgEaun5wOFA@cluster0.1750zav.mongodb.net/")
.then(()=>console.log("connected db"))
mongoose.pluralize(null)

const sch=mongoose.Schema({
    name:String,
    img:{
        data:String,
        contentType:String
    }
})

module.exports=mongoose.model("api1",sch)