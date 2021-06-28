const {Shop } = require("../db/models");

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
           attributes: ["id", "name"],
            include: {
              model: Product,
              as: "products",
              attributes: ["id"],
            },
          });
      
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
                    //productAdd
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