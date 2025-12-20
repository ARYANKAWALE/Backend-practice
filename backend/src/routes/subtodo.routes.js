import { Router } from "express"
import { VerifyJWT } from "../middleware/auth.middleware.js"
import { createSubTodo, deleteSubTodo, getAllSubTodos, modifySubTodo } from "../controllers/sub-todo.controllers.js"

const router = Router()

router.route("/add/:todoID").post(VerifyJWT, createSubTodo)
router.route("/").get(VerifyJWT, getAllSubTodos)
router.route("/update/:id").patch(VerifyJWT, modifySubTodo)
router.route("/delete/:todoID/:subTodo").delete(VerifyJWT, deleteSubTodo)

export default router
