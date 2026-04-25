import { Request, Response } from "express"
import User from "../models/user.model"
import Order from "../models/order.model"

export const users = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const orders = async (req: Request, res: Response) => {
    try {
        const allOrders = await Order.find().populate("user")
        res.json(allOrders)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const changeStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const updated = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )

        res.json(updated)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
