import { Request, Response } from "express"
import User from "../models/user.model"

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const user = await User.findById(userId)

        res.json(user)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}