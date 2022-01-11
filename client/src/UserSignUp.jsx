import React from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { navigate } from "@reach/router"
import { getSavedItem, saveInCache } from "./Utils/helpers"

const UserSignUp = () => {
  const [formData, setFormData] = React.useState(null)
  React.useEffect(() => {
    console.log("LOADING DATA")
    console.log(`/api/user/details/${window.location.search}`)
    fetch(`/api/user/details/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data)
        if (data.profileUpdated) {
          saveInCache("isLoggedIn", true)
          if (getSavedItem("selectedCourseId")) {
            return navigate(`/courses/details/${getSavedItem("selectedCourseId")}`)
          } else {
            saveInCache("hasInitiatedPayment", false)
            return navigate("/courses")
          }
        }
        return data
      })
      .then((data) => setFormData(data))
  }, [])

  return !formData ? (
    <h1>Loading...</h1>
  ) : (
    <main data-testid="main">
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>Just Few More Steps</h2>
          <p>Can't wait to welcome you</p>
        </div>
      </div>
      <section className="contact row mt-5">
        <div className="col-lg-3">&nbsp;</div>

        <div className="col-lg-6 mt-5">
          <Formik
            initialValues={{ email: formData.email, name: formData.name }}
            validate={(values) => {
              const errors = {}

              if (!values.college) {
                errors.college = "Required"
              }
              if (!values.stream) {
                errors.stream = "Required"
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = "Required"
              }
              return errors
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true)
              const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              }

              fetch(`/api/user/details`, requestOptions)
                .then((res) => res.json())
                .then((_data) => {
                  setSubmitting(false)
                  console.log("hello")
                  saveInCache("isLoggedIn", true)
                  window.location.href = "/courses"
                })
            }}
          >
            {({ errors, isSubmitting, touched }) => (
              <Form className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <Field name="name" className="form-control" disabled={true} />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <Field type="email" name="email" className="form-control" disabled={true} />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <Field name="college" type="text" className="form-control" placeholder="Your College Name" />
                  <ErrorMessage name="college" />
                </div>
                <div className="form-group mt-3">
                  <Field name="stream" type="text" className="form-control" placeholder="What's Your Stream" />
                  <ErrorMessage name="stream" />
                </div>
                <div className="form-group mt-3">
                  <Field name="phoneNumber" type="text" className="form-control" placeholder="Your Phone Number" />
                  <ErrorMessage name="phoneNumber" />
                </div>
                <div className="text-center">
                  <button type="submit">Add Me To Crammin</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-lg-3">&nbsp;</div>
      </section>
    </main>
  )
}

export default UserSignUp
