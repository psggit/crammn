import React from "react"
import {Link, useParams} from "@reach/router";

const NavLink = props => {

    return (
        <Link{...props} getProps={({isCurrent}) => {
            // the object returned here is passed to the
            return {
                className: isCurrent ? 'active' : ''
            };
        }
        }
        />)
};

const Header = (props) => {

    const [userData, setUserData] = React.useState(null)

    React.useEffect(() => {
        console.log("LOADING DATA")
        fetch(`/api/user/details/`)
            .then((res) => res.json())
            .then((data) => setUserData(data))
    }, [])

    const startLearning = () => {
        if (userData && userData.authorized)
            return null

        return (
            <li id='signindropdown' className="dropdown sign-dropdown">
                    <a id="get-started-btn" href="#" className="dropdown get-started-btn dropdown">Start Learning <i
                        className="bi bi-chevron-down"></i></a>
                    <ul className="sign-dropdown-container">
                        <div id="g_id_onload"
                             data-client_id="86586798573-o43mavsuo9aclh25qb2jn9vkcnpo63bt.apps.googleusercontent.com"
                             data-context="use"
                             data-ux_mode="popup"
                             data-login_uri="https://crammn.com/auth/google/callback"
                             data-nonce=""
                             data-auto_prompt="false">
                        </div>

                        <div className="g_id_signin center"
                             data-type="standard"
                             data-shape="pill"
                             data-theme="filled_blue"
                             data-text="signin_with"
                             data-size="large"
                             data-logo_alignment="left"
                             data-width="300px">
                        </div>
                    </ul>
            </li>)
    }

    const signOut = () => {
        if (userData && userData.authorized)
            return (
                <li className="dropdown sign-dropdown">
                    <a id="get-started-btn" href="#" className="dropdown get-started-btn dropdown">Account <i
                        className="bi bi-chevron-down"></i></a>
                    <ul>
                        <li>
                            <a href="/signout">Sign me out!!</a>
                        </li>
                    </ul>
                </li>)

        return null
    }


    return (
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">

                <h1 className="logo me-auto"><a href="index.html">Crammn</a></h1>

                <nav id="navbar" className="navbar order-last order-lg-0">
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                        <li><NavLink to='/courses'>Courses</NavLink></li>
                        <li><NavLink to='/contact'>Contact</NavLink></li>
                        {startLearning()}
                        {signOut()}
                    </ul>

                        <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

            </div>
        </header>
    )
    }

    export default Header;