import { Request, Response } from "express"
import Order from "../models/order.model"

export const makeOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const { items, total } = req.body

        const order = await Order.create({
            user: userId,
            items,
            total,
            status: "pending"
        })

        res.json(order)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const myOrders = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id

        const orders = await Order.find({ user: userId }).populate("items.product")

        res.json(orders)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
