import { Router } from "express";
import { createTodo, modifyTodo, deleteTodo, getAllTodos } from "../controllers/todo.controllers.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = Router()
router.use(VerifyJWT)

router.route("/add").post(createTodo)
router.route("/modify/:todoID").patch(modifyTodo).delete(deleteTodo)

router.route("/").get(getAllTodos)

export default router