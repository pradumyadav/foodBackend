const Product = require("../models/Product");
const User = require("../models/User");
exports.createProduct =async (req,res)=>{
    const  newProduct =new Product (req.body);

    try {
       const response =await newProduct.save();
       res.status(201).json(response)
    }
      catch(err){
        res.status(400).json(err);
    }
    
 };
 exports.getAllProduct =async (req,res)=>{
    try {
       const response =await Product.find();
       res.status(201).json(response)
    }
      catch(err){
        res.status(400).json(err);
    }
    
 };

 



