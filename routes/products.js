const  express= require("express");
const upload = require("../middleware/multer");
//controlers
const {productData, productDelete,productUpdate} = require ("../controllers/products")

const router = express.Router()

const {
    // [...]
    fetchProduct,
  } = require("../controllers/products");

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
router.get("/",productData)
//Delete 
router.delete(["/:productId"],productDelete);
// Add
// router.post("/",upload.single("image"),productAdd);
//update
router.put("/:productId",upload.single("image"), productUpdate);

module.exports = router