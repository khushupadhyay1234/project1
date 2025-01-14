const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/scath");

const productschema=mongoose.Schema({
    image:String,
    name:String,
    price:String,
    discount:{
        type:Number,
        default:0

    },
    bgcolor:String,
    panecolor:String,
    textcolor:String,
});
module.exports=mongoose.model("product",productschema);