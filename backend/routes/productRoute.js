const express=require("express")
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController")
const { isAuthenticatedUser } = require("../middlewares/auth")

const router=express.Router()


router.route("/products").get(isAuthenticatedUser, getAllProducts)
router.route("/product/new").post(createProduct)
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)
module.exports=router