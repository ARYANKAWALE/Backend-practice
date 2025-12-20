import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { todo } from "../models/todo.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createTodo = asyncHandler(async (req, res) => {
    const { headline, content, completed } = req.body

    if (!headline) {
        throw new ApiError(400, "Headline is required")
    }

    const createdTodo = await todo.create({
        headline,
        content: content || "",
        completed: completed || false,
        createdBy: req.user._id
    })

    if (!createdTodo) {
        throw new ApiError(500, "Something went wrong while creating the todo")
    }

    return res.status(201).json(
        new ApiResponse(201, createdTodo, "Todo created successfully")
    )

})

const modifyTodo = asyncHandler(async (req, res) => {
    const { headline, content, completed } = req.body
    const todoID = req.params.todoID

    if (!headline && !content && completed === undefined) {
        throw new ApiError(400, "Content is required")
    }
    const updateFields = {}
    if (headline) updateFields.headline = headline
    if (content) updateFields.content = content
    if (completed !== undefined) updateFields.completed = completed

    const modifiedTodo = await todo.findByIdAndUpdate(
        {
            _id: todoID,
            createdBy: req.user._id
        },
        {
            $set: updateFields
        },
        {
            new: true
        }
    )

    if (!modifiedTodo) {
        throw new ApiError(404, "Todo not found")
    }

    return res.status(200).json(
        new ApiResponse(200, modifiedTodo, "Todo modified successfully")
    )
})

const deleteTodo = asyncHandler(async (req, res) => {
    const todoID = req.params.todoID

    const deletedTodo = await todo.findOneAndDelete({
        _id: todoID,
        createdBy: req.user._id
    })

    if (!deletedTodo) {
        throw new ApiError(404, "Todo not found or unauthorized")
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Todo deleted successfully")
    )
})

const getAllTodos = asyncHandler(async (req, res) => {
    const todos = await todo.find({
        createdBy: req.user._id
    })

    return res.status(200).json(
        new ApiResponse(200, todos, "Todos fetched successfully")
    )
})

export {
    createTodo,
    modifyTodo,
    deleteTodo,
    getAllTodos
}