const  express= require("express");
const slugify = require("slugify");
let data = require ("../data");
const {Product,Shop}= require("../db/models");

// fetchProduct
exports.fetchProduct = async (productId, next) => {
  try {
      const foundProduct = await Product.findByPk(productId)
      return foundProduct
  } catch (error) {
      next(error)
  }
}

//productData
exports.productData = async(req,res,next)=>{
    try {
        const products = await Product.findAll({
          attributes: { exclude: ["createdAt", "updatedAt"]}}
          );
        res.status(200).json(products);
       
      } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
        
      }
}

//productDelete
exports.productDelete= async (req, res,next) => {
    try {
           await req.product.destroy();
            res.status(204).end();
             } catch (error) {
        // res.status(500).json({message: "server error"});
        next(error);

     
     }
    };


    exports.productAdd=async (req,res,next)=>{

      try {
        if (req.file) {
          req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
        }
         req.body.shopId = req.shop.id;
        // console.log(req.body)
          const productAdd = await Product.create(req.body);
          console.log(productAdd)
          res.status(201).json(productAdd);
          
  
        } catch (error) {
          // res.status(500).json({ message: error.message || "server error" });
          next(error);
  
               }
  
              }
              
            //productUpdate
exports.productUpdate = async (req, res,next) => {
   try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
        await req.product.update(req.body);
        res.json(req.product);

 } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
}
            };


