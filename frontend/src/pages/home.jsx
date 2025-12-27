import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import avatar from "../assets/images/image.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Home = () => {

    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isClose, setIsClose] = useState(false)
    const [theme, setTheme] = useState("dark")

    const fetchTodos = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v4/todos/", {
                withCredentials: true
            })
            setTodos(response.data.data)
        } catch (error) {
            console.log("Error fetching todos", error)
            toast.error("Failed to load todos")
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
            toast.success("Logged out successfully!")
            setTimeout(() => navigate("/login"), 1000)
        } catch (error) {
            console.log("Logout Failed", error)
            toast.error("Failed to logout. Please try again.")
        }
    }

    const handleAddTodo = (addTodo) => {
        navigate("/add")
    }

    const handleEditClick = (todo) => {
        navigate(`/todo/${todo._id}`)

    }

    // const handleDeleteTodo= async(id)=>{
    //     try {
    //         await axios.delete(`http://localhost:4000/api/v4/todos/${id}`, {
    //             withCredentials: true
    //         })
    //         alert("Todo deleted successfully!")
    //         navigate("/")
    //     } catch (error) {
    //         console.log("Error deleting todo", error)
    //     }
    // }

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }



    return (
        <div className="min-h-screen bg-[#fafafa] text-black flex justify-center items-center p-4">
            <div className="text-center space-y-6 max-w-7xl w-full relative">
                <div className='bg-[#fdfdfd] p-8 rounded-2xl shadow-xl w-full'>
                    <div className='absoute top-1/2 flex gap-2'>
                        <div className='w-4 h-4 bg-red-500 rounded-full'></div>
                        <div className='w-4 h-4 bg-yellow-500 rounded-full'></div>
                        <div className='w-4 h-4 bg-green-500 rounded-full'></div>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-black">Your Todos</h2>
                        <div className='flex gap-2 items-center'>
                            <img className='w-10 h-10 rounded-full' src={avatar} alt='avatar' />
                            <FontAwesomeIcon icon={faGear} onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 text-3xl transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                            {isOpen && (
                                <div className="absolute right-16 top-16 w-48 bg-[#fdfdfd] text-black p-4 rounded-lg shadow-xl border border-[#757575] z-50">
                                    <div className="mt-2">
                                        <Link to="/profile" className="block px-4 py-2 cursor-pointer text-inherit no-underline hover:bg-gray-200 transition-all rounded-md">Profile</Link>
                                    </div>
                                    <div onClick={handleThemeChange} className='mt-2'>
                                        <button className="block px-12 py-2 cursor-pointer text-inherit no-underline hover:bg-gray-200 transition-all rounded-md">{theme === "dark" ? "Light" : "Dark"}</button>
                                    </div>
                                    <div className="mt-2">
                                        <Link to="/login" onClick={logout} className="block px-4 py-2 cursor-pointer text-inherit no-underline hover:bg-red-700 transition-all rounded-md">Logout</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <p className="text-gray-400">Loading todos...</p>
                    ) : todos.length > 0 ? (
                        <div className="flex flex-wrap gap-4 justify-center">
                            {todos.map((todo) => (
                                <div onClick={() => handleEditClick(todo)} key={todo._id}
                                    className="bg-[#fdfdfd] text-black p-4 max-h-[20vh] rounded-lg text-left overflow-hidden w-[25vh] hover:scale-105 transition-transform shadow cursor-pointer md:w-[30vh] w-[20vh]">
                                    <h3 className="text-xl font-bold text-blue-400 line-clamp-2">{todo.headline}</h3>
                                    <p className="text-black mt-2 line-clamp-3">{todo.content}</p>
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
                            <div onClick={handleAddTodo} className='border-dashed border-2 p-10 w-64 rounded-lg cursor-pointer border-[#2a3646]'>
                                <p className='text-gray-400 text-center'>Add New Todo</p>
                                <p className='text-center text-2xl'>+</p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center h-full'>
                            <p className="text-gray-400">No todos found.</p>
                            <div onClick={handleAddTodo} className='border-dashed border-2 p-10 w-64 rounded-lg cursor-pointer'>
                                <p className='text-gray-400 text-center'>Add New Todo</p>
                                <p className='text-center text-2xl'>+</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home