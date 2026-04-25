import express, { Router } from "express"
import { auth } from "../middlewares/auth.middleware"
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller"

const router: Router = express.Router()

router.get("/", auth, getProducts)
router.get("/:id", auth, getProduct)
router.post("/", auth, createProduct)
router.put("/:id", auth, updateProduct)
router.delete("/:id", deleteProduct)

export default router
