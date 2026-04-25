import { Request, Response } from "express"
import User from "../models/user.model"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await User.findByIdAndDelete(id)

        res.json({ message: "User deleted" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const makeAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await User.findByIdAndUpdate(id, { role: "admin" })

        res.json({ message: "User promoted to admin" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
