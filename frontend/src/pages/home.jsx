import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

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
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-6 max-w-2xl">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                    Welcome to home page
                </h1>
                <p className='text-gray-400 text-xl'>
                    You have successfully authenticated with the Backend.
                </p>
                <div className='bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl mt-8'>
                    <p className='text-gray-300 mb-6'>
                        Your access tokens are active. You can now access protected routes.
                    </p>

                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all'
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home