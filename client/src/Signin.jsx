import React from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { navigate } from "@reach/router"

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
          <div
            id="g_id_onload center"
            data-client_id="86586798573-o43mavsuo9aclh25qb2jn9vkcnpo63bt.apps.googleusercontent.com"
            data-context="use"
            data-ux_mode="popup"
            data-login_uri="http://localhost:3001/auth/google/callback"
            data-nonce=""
            data-auto_prompt="false"
          ></div>

          <div
            className="g_id_signin center"
            data-type="standard"
            data-shape="pill"
            data-theme="filled_blue"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
            data-width="300px"
          ></div>
        </div>
      </section>
    </main>
  )
}

export default SignIn
