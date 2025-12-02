import React from 'react'
import { Link } from 'react-router-dom'
import type { User } from '../App'

const Header: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  return (
    <div style={{ background:'#fff', padding:'12px 0', borderBottom:'1px solid #eee' }}>
      <div className='container header'>
        <div><Link to='/' style={{ textDecoration:'none', color:'#333', fontWeight:700 }}>My Blog</Link></div>
        <div>
          <span style={{ marginRight:12 }}>Welcome, <strong>{user.firstName}</strong></span>
          <Link to='/about' style={{ marginRight:12 }}>About</Link>
          <button className='btn' onClick={onLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Header
