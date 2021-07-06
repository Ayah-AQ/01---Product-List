const  express= require("express");
const upload = require("../middleware/multer");
//controlers
const {productData, productDelete,productUpdate} = require ("../controllers/products")

const router = express.Router()

const {
    // [...]
    fetchProduct,
  } = require("../controllers/products");
const passport = require("passport");

router.param("productId", async (req, res, next, productId) => {
  const foundProduct = await fetchProduct(productId, next);
  if(foundProduct) {
    req.product = foundProduct;
    next()
  } else {
    next({
      status: 404,
      message: "Product not found"
    });
  }
})


//route path
router.get("/", productData)
//Delete 
router.delete(["/:productId"],  passport.authenticate("jwt", { session: false }),
productDelete);
// Add
// router.post("/",upload.single("image"),productAdd);
//update
router.put("/:productId",  passport.authenticate("jwt", { session: false }),
upload.single("image"), productUpdate);

module.exports = router