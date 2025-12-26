import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import avatar from "../assets/images/image.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isClose, setIsClose] = useState(false)

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

    const handleAddTodo = () => {
        navigate("/add-todo")
    }

    const handleEditClick = (todo) => {
        navigate(`/todo/${todo._id}`)

    }


    // const handleLongContent = (content) => {
    //     if (content.length > 100) {
    //         return content.substring(0, 100) + "..."
    //     }
    //     return content
    // }






    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center p-4">
            <div className="text-center space-y-6 max-w-7xl w-full relative">
                <div className='bg-gray-900 p-8 rounded-2xl shadow-xl w-full'>
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">Your Todos</h2>
                            <div className='flex gap-2 items-center'>
                                <img className='w-10 h-10 rounded-full' src={avatar} alt='avatar' />
                                <FontAwesomeIcon icon={faGear} onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 text-3xl transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                                {isOpen && (
                                    <div className="absolute right-16 top-16 w-48 bg-gray-900 text-white p-4 rounded-lg shadow-xl border border-[#757575] z-50">
                                        <Link to="/profile" className="block px-4 py-2 cursor-pointer text-inherit no-underline hover:bg-gray-700 transition-all rounded-md">Profile</Link>
                                        <Link to="/login" onClick={logout} className="block px-4 py-2 cursor-pointer text-inherit no-underline hover:bg-red-700 transition-all rounded-md">Logout</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-gray-400">Loading todos...</p>
                    ) : todos.length > 0 ? (
                        <div className="flex flex-wrap gap-4 justify-center">
                            {todos.map((todo) => (
                                <div onClick={() => handleEditClick(todo)} key={todo._id}
                                    className="bg-gray-800 p-4 max-h-[20vh] rounded-lg text-left overflow-hidden w-[25vh] hover:scale-105 transition-transform shadow cursor-pointer">
                                    <h3 className="text-xl font-bold text-orange-400 line-clamp-2">{todo.headline}</h3>
                                    <p className="text-gray-300 mt-2 line-clamp-3">{todo.content}</p>
                                    <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
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
                            <div onClick={handleAddTodo} className='border-dashed border-2 p-10 w-64 rounded-lg cursor-pointer'>
                                <p className='text-gray-400 text-center'>Add New Todo</p>
                                <p className='text-center text-2xl'>+</p>
                            </div>
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