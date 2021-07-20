import React from "react"
import { navigate } from "@reach/router"
import GoogleSignIn from "./GoogleSignIn"

const SignIn = () => {
  React.useEffect(() => {
    console.log("LOADING DATA")
    console.log(`/api/user/details/${window.location.search}`)
    fetch(`/api/user/details/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.profileUpdated) {
          return navigate(`/courses`)
        }
        if (data.authorized) {
          return navigate(`/signup`)
        }
        return data
      })
  }, [])

  return (
    <main data-testid="main">
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>Sign in</h2>
          <p>Use supported social logins</p>
        </div>
      </div>
      <section className="contact row mt-5">
        <div className="col-lg-5">&nbsp;</div>

        <div className="col-lg-3 mt-5">
          <GoogleSignIn />
        </div>
      </section>
    </main>
  )
}

export default SignIn
