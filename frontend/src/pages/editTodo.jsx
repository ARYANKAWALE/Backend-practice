import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditTodo = () => {
    const { id } = useParams()
    const navigate = useNavigate() // User ko wapas bhejne ke liye

    const [headline, setHeadline] = useState('')
    const [content, setContent] = useState('')
    const [initialHeadline, setInitialHeadline] = useState('')
    const [initialContent, setInitialContent] = useState('')
    const [loading, setLoading] = useState(true) // Loading state taki blank form na dikhe

    // 1. Purana Data Fetch karne ka logic
    const fetchTodo = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v4/todos/${id}`, {
                withCredentials: true
            })
            console.log("Fetched Todo:", response.data)
            // Data aate hi state me set kar do
            setHeadline(response.data.data.headline)
            setContent(response.data.data.content)
            setInitialHeadline(response.data.data.headline)
            setInitialContent(response.data.data.content)
            setLoading(false)
        } catch (error) {
            console.log("Error fetching todo", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTodo()
    }, [id])

    // 2. Naya Data Database me Update karne ka logic
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            // Yaha PUT request jayegi naye data ke sath
            const response = await axios.patch(`http://localhost:4000/api/v4/todos/modify/${id}`, {
                headline: headline,
                content: content
            }, {
                withCredentials: true
            })

            console.log("Update Success:", response.data)

            // Update hone ke baad wapas Home page ya List page pe bhej do
            navigate('/')
        } catch (error) {
            console.log("Error updating todo", error)
        }
    }

    const isChanged = headline !== initialHeadline || content !== initialContent

    if (loading) return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center">
            <div className="text-xl">Loading Todo...</div>
        </div>
    )

    return (
        <div className="min-h-screen bg-black text-white flex justify-center items-center p-4">
            <div className='bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-[70vh] border border-gray-800'>
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">Edit Todo</h1>

                <form onSubmit={handleUpdate} className="flex flex-col gap-4">

                    {/* Headline Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-sm">Headline</label>
                        <input
                            type="text"
                            value={headline} // Ye zaroori hai taki purana data dikhe
                            onChange={(e) => setHeadline(e.target.value)}
                            className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter Headline"
                        />
                    </div>

                    {/* Content Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 text-sm">Content</label>
                        <textarea
                            value={content} // Ye zaroori hai
                            onChange={(e) => setContent(e.target.value)}
                            rows="6"
                            className="bg-gray-800 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            placeholder="Enter Content"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all"
                        >
                            Cancel
                        </button>
                        <button onClick={handleUpdate}
                            type="submit"
                            disabled={!isChanged}
                            className={`flex-1 font-bold py-3 rounded-lg transition-all shadow-lg ${isChanged ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                        >
                            Update Todo
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default EditTodo