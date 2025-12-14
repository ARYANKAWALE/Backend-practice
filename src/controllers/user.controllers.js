import { User } from "../models/user.models.js"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

const registerUser = async (req, res) => {
    const { name, age, password } = req.body

    if (!name || !age || !password) {
        return res.status(400).json({ message: "Name, age and password are required" })
    }
    if (name === "") {
        return res.status(400).json({ message: "Name is required" })
    }
    if (age === "") {
        return res.status(400).json({ message: "Age is required" })
    }


    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create(
            { name, age, password: hashedPassword }
        )
        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }

}

const loginUser = async (req, res) => {
    const { name, password } = req.body
    const user = await User.findOne({ name });

    if (!name || !password) {
        return res.status(400).json({ message: "name and password is required" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" })
    }
    res.json({ message: "Login successful", user })


}

export { registerUser, loginUser }