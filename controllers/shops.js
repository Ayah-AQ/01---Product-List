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
      // console.log("hiiii");
      res.json(shops);
    } catch(error) {
      next(error);
    }
};

    //shopAdd
    exports.shopAdd=async (req,res,next)=>{

      try {
        const foundShop = await Shop.findOne({
          where: { userId: req.user.id },
        });
        if (foundShop) {
          res.status(400).json({ message: "You already have a shop" });
        } else {
          if (req.file) {
            req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
          }
          req.body.userId = req.user.id;
          const newShop = await Shop.create(req.body);
          res.status(201).json(newShop);
        }
      } catch (error) {
        next(error);
      }
    
                }
         //productAdd
         exports.productAdd = async (req, res, next) => {
          try {
            if (req.user.id === req.shop.userId) {
              req.body.shopId = req.shop.id;
              if (req.file) {
                req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
              }
              const newProduct = await Product.create(req.body);
              res.status(201).json(newProduct);
            } else {
              res
                .status(401)
                .json({ message: "You cannot add a product to another user's shop" });
            }
          } catch (error) {
            next(error);
          }
        };
        //UPDATE
        exports.shopUpdate = async (req, res, next) => {
          if (req.file) {
            req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
          }
          const updatedShop = await req.shop.update(req.body);
          res.status(200).json(updatedShop);
        };
         