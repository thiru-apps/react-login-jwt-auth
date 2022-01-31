import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from './services/auth';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Staff from './components/Staff';
import Agent from './components/Agent';
import Admin from './components/Admin';
import EventBus from './common/EventBus';

const App = () => {
  const [staff, setShowStaff] = useState("")
  const [admin, setShowAdmin] = useState("")
  const [currentUser, setCurrentUser] = useState("")


  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdmin(user.roles.includes("ADMIN"))
      setShowStaff(user.roles.includes("STAFF"))
    }

    EventBus.on("logout", () => {
      logOut();
    })

    return () => {
      EventBus.remove("logout")
    }

  }, [])

  const logOut = () => {
    AuthService.logout()
    setShowAdmin(false)
    setShowStaff(false)
    setCurrentUser(undefined)
  }

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={"/"} className='navbar-brand'>MagizhNilan</Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {setShowStaff && (
            <li className="nav-item">
              <Link to={"/staff"} className="nav-link">
                Staff Content
              </Link>
            </li>
          )}

          {setShowAdmin && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Content
              </Link>
            </li>
          )}

          {setCurrentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className='container mt-3'>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<Staff />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

    </div>


  )

}

export default App;
