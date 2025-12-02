import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Blog from './pages/Blog'
import AddEditBlog from './pages/AddEditBlog'
import About from './pages/About'
import AuthModal from './pages/AuthModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type User = { id: number; firstName: string; lastName: string; email: string; }

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userJson = localStorage.getItem('user')
    if (token && userJson) setUser(JSON.parse(userJson))
  }, [])

  const handleLogin = (token: string, userObj: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userObj))
    setUser(userObj)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  if (!user) return <AuthModal onLogin={handleLogin} />

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home user={user} />} />
          <Route path='/blog/:id' element={<Blog user={user} />} />
          <Route path='/add' element={<AddEditBlog user={user} />} />
          <Route path='/edit/:id' element={<AddEditBlog user={user} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      <ToastContainer position='top-right' autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
