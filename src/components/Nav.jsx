import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({params}) => {
  return (
    <nav className='d-flex align-items-center justify-content-center bg-dark text-white p-3'>
        <div className="d-flex">
            <Link className={`btn btn-link btn-sm ${params == 'main' ? 'text-success': ''}`} to='/main'>Projects</Link>
            <Link className={`btn btn-link btn-sm ${params == 'display' ? 'text-success': ''}`} to='/display'>Display</Link>
            <Link className={`btn btn-link btn-sm ${params == 'resume' ? 'text-success': ''}`} to='/resume'>Resume</Link>
        </div>
    </nav>
  )
}

export default Nav
