import { Request, Response } from "express"
import Cart from "../models/cart.model"

export const getCart = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const cart = await Cart.findOne({ user: userId }).populate("items.product")
        res.json(cart)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const addItem = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const { product, quantity } = req.body

        let cart = await Cart.findOne({ user: userId })

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ product, quantity }]
            })
        } else {
            cart.items.push({ product, quantity } as any)
            await cart.save()
        }

        res.json({ message: "Item added" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const removeItem = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const { productId } = req.body

        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(400).json({ message: "Cart not found" })
        }

        const filtered = cart.items.filter((item: any) => {
            return item.product.toString() !== productId
        })

        cart.items.splice(0, cart.items.length)

        for (const item of filtered) {
            cart.items.push(item as any)
        }

        await cart.save()

        res.json({ message: "Item removed" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
