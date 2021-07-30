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

exports.productDelete = async (req, res, next) => {
  try {
    const foundShop = await Shop.findByPk(req.product.shopId);

    if (req.user.id === foundShop.userId) {
      await req.product.destroy();
      res.status(204).end();
    } else {
      res
        .status(401)
        .json({ message: "You cannot delete another shop's products" });
    }
  } catch (error) {
    next(error);
  }
};
        //productUpdate
        exports.productUpdate = async (req, res, next) => {
          try {
            const foundShop = await Shop.findByPk(req.product.shopId);
        
            if (req.user.id === foundShop.userId) {
              if (req.file) {
                req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
              }
              await req.product.update(req.body);
              res.status(200).json(req.product);
            } else {
              res
                .status(401)
                .json({ message: "You cannot update another shop's products" });
            }
          } catch (error) {
            next(error);
          }
        };