import { Request, Response } from "express"
import Product from "../models/product.model"

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, description } = req.body

        const product = await Product.create({
            name,
            price,
            description
        })

        res.json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        res.json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })

        res.json(updated)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id)

        res.json({ message: "Product deleted" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
