import React, { useRef, useState } from "react"
import { Link } from "@reach/router"
import GoogleSignIn from "./GoogleSignIn"

const safeCheck = (fn) => {
  try {
    return fn()
  } catch (err) {
    console.error(err)
    // no_op
  }
  return false
}

const NavLink = (props) => {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        // the object returned here is passed to the
        return {
          className: isCurrent ? "active" : "",
        }
      }}
    />
  )
}

const Header = (props) => {
  const [userData, setUserData] = useState(null)
  const [isMobileNav, setMobileNav] = useState(false)
  const [isMobileSignInActive, setMobileSignInActive] = useState(false)
  const [isMobileSignOutActive, setMobileSignOutActive] = useState(false)
  const mobileNavRef = useRef(null)
  React.useEffect(() => {
    console.log("LOADING DATA")

    fetch(`/api/user/details/`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
  }, [])

  const startLearning = () => {
    if (userData && userData.authorized) return null

    return (
      <li id="signindropdown" className="dropdown sign-dropdown ">
        <a id="get-started-btn" href="#" className="dropdown get-started-btn dropdown" onClick={() => setMobileSignInActive(!isMobileSignInActive)}>
          Start Learning <i className="bi bi-chevron-down"></i>
        </a>
        <ul className="sign-dropdown-container" className={isMobileSignInActive ? "dropdown-active" : ""}>
          <GoogleSignIn />
        </ul>
      </li>
    )
  }

  const signOut = () => {
    if (userData && userData.authorized)
      return (
        <li className="dropdown sign-dropdown">
          <a id="get-started-btn" href="#" className="dropdown get-started-btn dropdown" onClick={() => setMobileSignOutActive(!isMobileSignOutActive)}>
            Account <i className="bi bi-chevron-down"></i>
          </a>
          <ul className={isMobileSignOutActive ? "dropdown-active" : ""}>
            <li>
              <a href="/signout">Sign me out!!</a>
            </li>
          </ul>
        </li>
      )

    return null
  }

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
          <NavLink to="/">Crammn</NavLink>
        </h1>

        <nav
          id="navbar"
          className={isMobileNav ? "navbar order-last order-lg-0 navbar-mobile" : "navbar order-last order-lg-0"}
          onClick={(e) => {
            if (safeCheck(() => mobileNavRef.current.contains(e.target))) {
              if (isMobileNav && !safeCheck(() => e.target.classList.contains("get-started-btn"))) setMobileNav(false)
              return
            }
            if (isMobileNav) setMobileNav(false)
            if (isMobileSignInActive) setMobileSignInActive(false)
            if (isMobileSignOutActive) setMobileSignOutActive(false)
          }}
        >
          <ul ref={mobileNavRef}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {startLearning()}
            {signOut()}
          </ul>

          <i className="bi bi-list mobile-nav-toggle" onClick={() => setMobileNav(!isMobileNav)}></i>
        </nav>
      </div>
    </header>
  )
}

export default Header
