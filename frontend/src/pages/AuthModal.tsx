import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import type { User } from '../App'

const AuthModal: React.FC<{ onLogin?: (token: string, user: User) => void }> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(true)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = isRegister ? 'http://localhost:5000/register' : 'http://localhost:5000/login'
      const res = await axios.post(url, form)
      const { token, user } = res.data
      toast.success(isRegister ? 'Registered' : 'Logged in')
      if (onLogin) onLogin(token, user)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      window.location.reload()
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Auth failed')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ maxWidth:420, margin:'80px auto', padding:20, background:'#fff', borderRadius:8 }}>
      <h3>{isRegister ? 'Register' : 'Login'}</h3>
      <form onSubmit={submit}>
        {isRegister && (
          <>
            <input name='firstName' placeholder='First name' value={form.firstName} onChange={handleChange} className='input' required />
            <input name='lastName' placeholder='Last name' value={form.lastName} onChange={handleChange} className='input' required />
          </>
        )}
        <input name='email' placeholder='Email' value={form.email} onChange={handleChange} className='input' required />
        <input name='password' type='password' placeholder='Password' value={form.password} onChange={handleChange} className='input' required />
        <button type='submit' className='btn' disabled={loading}>{loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p style={{ marginTop:10 }}>
        <a style={{ cursor:'pointer' }} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </a>
      </p>
    </div>
  )
}

export default AuthModal
