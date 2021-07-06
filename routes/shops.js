const express = require("express");
const passport = require("passport");
const { shopsList, shopAdd, productAdd, fetchShop,shopUpdate } = require("../controllers/shops");
const upload = require("../middleware/multer");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
    const foundShop = await fetchShop(shopId, next);
    if(foundShop) {
        req.shop = foundShop;
        next();
    }else{
        next({
            status: 404, 
            message: "Shop not found"
        });
    }
});

// LIST SHOPS
router.get("/", shopsList);

// DETAIL SHOP
// router.get("/:shopId", shopDetail);

// CREATE SHOP
router.post("/new",   passport.authenticate("jwt", { session: false })
,upload.single("image"), shopAdd);

// CREATE PRODUCT
router.post("/:shopId/products",   passport.authenticate("jwt", { session: false }),
upload.single("image"), productAdd);

// DELETE SHOP
// router.delete("/:shopId",passport.authenticate("jwt", { session: false }), shopDelete);

// UPDATE SHOP
router.put("/:shopId", upload.single("image"), passport.authenticate("jwt", { session: false }),shopUpdate);

module.exports = router;