import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import avatar from "../assets/images/image.png"

const Home = () => {

    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const fetchTodos = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v4/todos/", {
                withCredentials: true
            })
            setTodos(response.data.data)
        } catch (error) {
            console.log("Error fetching todos", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v4/users/current-user", {
                withCredentials: true
            })
            setUser(response.data.data)
        } catch (error) {
            console.log("Error fetching user", error)
        }
    }

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ ...toast, show: false }), 3000);
    };

    useEffect(() => {
        fetchTodos()
        fetchUser()
    }, [])

    const logout = async () => {
        try {
            await axios.post("http://localhost:4000/api/v4/users/logout", {}, {
                withCredentials: true
            })
            alert("Loggedout user Successfully!")
            navigate("/login")
        } catch (error) {
            console.log("Login Failed", error)
        }
    }


    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 relative">
            <div className="text-center space-y-6 max-w-4xl w-full">
                <div className='bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl w-full'>
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">Your Todos</h2>
                            <div className='flex gap-2 items-center'>
                                <img className='w-10 h-10 rounded-full' src={avatar} alt='avatar' />
                                <button
                                    onClick={logout}
                                    className='ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all text-sm'
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-gray-400">Loading todos...</p>
                    ) : todos.length > 0 ? (
                        <div className="grid gap-4">
                            {todos.map((todo) => (
                                <div key={todo._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-left">
                                    <h3 className="text-xl font-bold text-orange-400">{todo.headline}</h3>
                                    <p className="text-gray-300 mt-2">{todo.content}</p>
                                    <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                                        <span>Status: {todo.completed ? "Completed" : "Pending"}</span>
                                        <span>Created: {new Date(todo.createdAt).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No todos found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home