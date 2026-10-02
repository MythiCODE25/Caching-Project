const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const { cacheMiddleware, invalidateCache } = require("../middleware/cache")

router.get("/products",cacheMiddleware,productController.getProducts)
router.get("/products/:id",cacheMiddleware,productController.getProductById)

router.post("/products",invalidateCache,productController.createProduct)
router.put("/products/:id",invalidateCache,productController.updateProduct)
router.patch("/products/:id",invalidateCache,productController.patchProduct)
router.delete("/products/:id",invalidateCache,productController.deleteProduct)

module.exports = router
