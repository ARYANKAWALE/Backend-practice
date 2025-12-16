import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [data, setData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", data);
    try {
      // 2. The API Call
      const response = await axios.post(
        "http://localhost:4000/api/v4/users/register", // Your Backend URL
        data, // The data (username, password)
        {
          withCredentials: true // 3. IMPORTANT: Allows the backend to set cookies
        }
      )

      console.log("Success:", response.data)
      showToast("Register Successful! 🎉", "success")

      // Optional: Redirect to login page later
      setTimeout(() => navigate("/login"), 2000)

    } catch (error) {
      console.error("Error:", error)
      // Show the specific error message from backend (ApiError)
      showToast(error.response?.data?.message || "Register failed", "danger")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fafafa] text-white relative">
      {/* Bootstrap Toast */}
      {toast.show && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className={`toast show align-items-center text-white bg-${toast.type} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">
                {toast.message}
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setToast({ ...toast, show: false })} aria-label="Close"></button>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 flex-col p-8 border border-gray-300 bg-[#ffffffaa] rounded-lg min-w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-4 text-black text-center">Register</h1>
        <div className="flex flex-col text-black">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={data.username}
            onChange={handleChange}
            className="p-2 rounded bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter username"
          />
        </div>
        <div className="flex flex-col text-black">
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={data.fullname}
            onChange={handleChange}
            className="p-2 rounded bg-white border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter fullname"
          />
        </div>
        <div className="flex flex-col text-black">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            className="p-2 rounded bg-[#ffffff] border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col text-black">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            className="p-2 rounded  border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className=" p-2 bg-[#0016df] rounded hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
        <div className="flex justify-center text-black">
          <p>Have an Account?<Link to="/login" className="text-blue-500">Login</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register