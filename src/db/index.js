import mongoose from "mongoose"
import dotenv from "dotenv"
import { DB_NAME } from "../../constants.js"
dotenv.config()

export const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL.replace(/\/$/, "")}/${DB_NAME}`)
        console.log(`\n MongoDB connected: !! DB HOST : ${connectionInstance.connection.host}`)
    }
    catch (error) {
        console.log(error)
    }
}
