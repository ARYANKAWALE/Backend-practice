import { Router } from "express";
import { createTodo, modifyTodo, deleteTodo, getAllTodos, getTodo } from "../controllers/todo.controllers.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";

const router = Router()
router.use(VerifyJWT)

router.route("/add").post(createTodo)
router.route("/modify/:todoID").patch(modifyTodo).delete(deleteTodo)

router.route("/:todoID").get(getTodo)

router.route("/").get(getAllTodos)

export default router