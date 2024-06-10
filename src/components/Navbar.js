import React from 'react'
import { Link } from 'react-router-dom'

const Navbar=()=> {
  
    return (
      <div>
        <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top" data-bs-theme="dark">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">Daily LatestNews</Link>
      <ul className="navbar-nav me-auto mb-lg-0">
      <li><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
      <li><Link className="nav-link" to="/business">Business</Link></li>
      <li><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
      <li><Link className="nav-link" to="/general">General</Link></li>
      <li><Link className="nav-link" to="/health">Health</Link></li>
      <li><Link className="nav-link" to="/science">Science</Link></li>
      <li><Link className="nav-link" to="/sports">Sports</Link></li>
      <li><Link className="nav-link" to="/technology">Technology</Link></li>
      </ul>
  </div>
</nav>
      </div>
    )
  }

export default Navbar;