const {Shop,Product } = require("../db/models");

exports.fetchShop = async (shopId, next) => {
    try {
      const foundShop = await Shop.findByPk(shopId);
      return foundShop;
    } catch(error) {
      next(error);
    }
  };

// LIST SHOPS
exports.shopsList = async (req, res, next) => {
    try {
      const shops = await Shop.findAll({ 
           exclude: ["updatedAt", "createdAt"],
            include: {
              model: Product,
              as: "products",
              attributes: ["id"],
            },
          });
      console.log("hiiii");
      res.json(shops);
    } catch(error) {
      next(error);
    }
};

    //shopAdd
    exports.shopAdd=async (req,res,next)=>{

        try {
          if (req.file) {
            req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
          }
          // console.log(req.body)
            const shopAdd = await Shop.create(req.body);
            console.log(shopAdd)
            res.status(201).json(shopAdd);
            
    
          } catch (error) {
            // res.status(500).json({ message: error.message || "server error" });
            next(error);
    
                 }
    
                }
         //productAdd
         exports.productAdd=async (req,res,next)=>{
          try {
            if (req.file) {
              req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
            }
            // console.log(req.body)
              const shopAdd = await Product.create(req.body);
              console.log(shopAdd)
              res.status(201).json(shopAdd);
              
      
            } catch (error) {
              // res.status(500).json({ message: error.message || "server error" });
              next(error);
      
                   }
      
            }