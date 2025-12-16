import express from "express"
import mongoose from "mongoose"
import env from "dotenv"
import { dbConnect } from "./src/db/index.js"
import cookieParser from "cookie-parser"
import userRouter from "./src/routes/user.routes.js"
import cors from "cors"
env.config()
dbConnect()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use("/api/v4/users", userRouter)

// app.post('/todo', async (req, res) => {
//     const data = req.body
//     const newData = await Todo.create(data)
//     res.json(newData)
// })


// app.post('/login', (req, res) => {
//     const data = req.body
//     console.log(data)
//     res.json(data)
// })

// app.delete('/todo/:id', (req, res) => {
//     const idTODelete = parseInt(req.params.id)
//     const index = todo.findIndex(item => item.id === idTODelete);

//     if (index !== -1) {
//         todo.splice(index, 1);
//         res.json(todo);
//     } else {
//         res.status(404).json({ message: "ID not found" });
//     }
// })

// app.put('/todo/:id', (req, res) => {
//     const idToUpdate = parseInt(req.params.id);

//     const index = todo.findIndex(item => item.id === idToUpdate);

//     if (index === -1) {
//         return res.status(404).json({ message: "User not found" });
//     }
//     todo[index].name = req.body.name;

//     if (req.body.age) {
//         todo[index].age = req.body.age;
//     }

//     res.json(todo);
// })



app.get('/', (req, res) => {
    res.send("Hello User")
})

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})