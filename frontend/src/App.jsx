import './App.css'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Home from './pages/home.jsx'
import EditTodo from './pages/editTodo.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './pages/profile.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path='/' element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/todo/:id' element={<EditTodo/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
