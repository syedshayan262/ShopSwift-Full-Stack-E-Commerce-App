import { Request, Response } from "express"
import User from "../models/user.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        // Fix: ensure both values are strings
        const plain = password ?? ""
        const hashed = user.password ?? ""

        const isMatch = await bcrypt.compare(plain, hashed)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        )

        res.json({ token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.json({ message: "User registered" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}
