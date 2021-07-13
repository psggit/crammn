import React from "react"
import ReactDOM from "react-dom"
import { Router, Link } from "@reach/router";

import Courses from "./Courses"
import reportWebVitals from "./reportWebVitals"
import CourseDetails from "./CourseDetails"
import UserSignUp from "./UserSignUp"
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import SignIn from "./Signin";
import Error from "./Error";

const App = () => (
    <div>
        <Header />
        <Router>
            <Home path="/" />
            <About path="/about" />
            <Courses path="/courses" />
            <CourseDetails path="/courses/details/:courseId" />
            <UserSignUp path="/signup"/>
            <Contact path="/contact"/>
            <SignIn path="/signin"/>
            <Error default />
        </Router>
         <Footer />
    </div>
);

ReactDOM.render(<App />, document.getElementById("appRoot"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
