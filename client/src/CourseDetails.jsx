import React from "react"
import { saveInCache, getSavedItem } from "./Utils/helpers"
import axios from "axios"
import { navigate } from "@reach/router"

export default function CourseDetails(props) {
  const [data, setData] = React.useState(null)

  console.log("props", props)
  const isPaidCourse = props.location.state.paidInfo

  React.useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCorrect: true, courseId: parseInt(props.courseId) }),
    }
    fetch(`/api/course/details`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
      })
  }, [])

  React.useEffect(() => {
    if (getSavedItem("isLoggedIn") === "true" && getSavedItem("hasInitiatedPayment") === "true") {
      displayRazorpay()
    }
    return () => {
      saveInCache("hasInitiatedPayment", false)
    }
  }, [])

  // if (getSavedItem("isLoggedIn") === "true" && getSavedItem("hasInitiatedPayment") === "true") {
  //   displayRazorpay()
  // }

  const rightSidePanel = () => {
    if (isPaidCourse) {
      return data.subscribedContent.mainContent.map((info, index) => {
        if (data.subscribedContent.mainContent.length === 1 && data.auth === false) {
          return (
            <div className="col-lg-8">
              <iframe style={{ border: 0, width: "100%", height: "350px" }} title={info.subtitle} src={info.videoLink} frameBorder="0" allowFullScreen />
              <h3>{info.title}</h3> <br />
              <br />
              <h5>{info.highlights}</h5>
              <br />
              <br />
              <hr />
              <br />
            </div>
          )
        }
        return (
          <div className="col-lg-8">
            <h3>{info.title}</h3> <br />
            <br />
            <iframe style={{ border: 0, width: "100%", height: "350px" }} title={info.subtitle} src={info.videoLink} frameBorder="0" allowFullScreen />
            <h5>{info.highlights}</h5>
            <br />
            <br />
            <hr />
            <br />
          </div>
        )
      })
    } else {
      return data.unsubscribedContent.mainContent.map((info, index) => {
        if (data.unsubscribedContent.mainContent.length === 1 && data.auth === false) {
          return (
            <div className="col-lg-8">
              <iframe style={{ border: 0, width: "100%", height: "350px" }} title={info.subtitle} src={info.videoLink} frameBorder="0" allowFullScreen />
              <h3>{info.title}</h3> <br />
              <br />
              <h5>{info.highlights}</h5>
              <br />
              <br />
              <hr />
              <br />
            </div>
          )
        }
        return (
          <div className="col-lg-8">
            <h3>{info.title}</h3> <br />
            <br />
            <iframe style={{ border: 0, width: "100%", height: "350px" }} title={info.subtitle} src={info.videoLink} frameBorder="0" allowFullScreen />
            <h5>{info.highlights}</h5>
            <br />
            <br />
            <hr />
            <br />
          </div>
        )
      })
    }
  }

  const leftSidePanel = () => (
    <div className="col-lg-4">
      {isPaidCourse
        ? data.subscribedContent.sideContent.map((info, index) => {
            if (index === 0) {
              return (
                <div className="course-info d-flex justify-content-between align-items-center">
                  <h5>
                    <u>{info}</u>
                  </h5>
                </div>
              )
            }
            return (
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>{info}</h5>
              </div>
            )
          })
        : data.unsubscribedContent.sideContent.map((info, index) => {
            if (index === 0) {
              return (
                <div className="course-info d-flex justify-content-between align-items-center">
                  <h5>
                    <u>{info}</u>
                  </h5>
                </div>
              )
            }
            return (
              <div className="course-info d-flex justify-content-between align-items-center">
                <h5>{info}</h5>
              </div>
            )
          })}
      {!isPaidCourse && getCompleteCourse()}
    </div>
  )

  const handleClick = () => {
    saveInCache("selectedCourseId", props.courseId)
    saveInCache("hasInitiatedPayment", true)
  }

  const getCompleteCourse = () => {
    if (data.auth) {
      return null
    }

    return (
      <div className="get-complete-course">
        {getSavedItem("isLoggedIn") === "false" ? (
          <a href="/signin" onClick={handleClick} className="get-started-btn">
            Get the Full Course
          </a>
        ) : (
          <a href="" onClick={handleClick} className="get-started-btn">
            Get the Full Course
          </a>
        )}

        <p className="price-info">₹199 for 1 month</p>
      </div>
    )
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  async function displayRazorpay() {
    console.log("display razorpay")
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?")
      return
    }

    const result = await axios.post("/api/payment/order", { courseID: parseInt(props.courseId), isCorrect: true })

    console.log("res", result)

    if (!result) {
      alert("Server error. Are you online?")
      return
    }

    const { amount, id: pgOrderID, currency } = result.data.data

    const options = {
      key: "rzp_test_07EfSKjRh9HgqV", // Enter the Key ID generated from the Dashboard
      amount: parseInt(amount) * 100,
      currency: "INR",
      name: "CRAMMN",
      //description: "Test Transaction",
      order_id: pgOrderID,
      image: "/payment/crammn.svg",
      handler: async function (response) {
        const data = {
          orderCreationId: pgOrderID,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        }

        const result = await axios.post("/payment/verify", data)

        saveInCache("hasInitiatedPayment", false)
        navigate("/payment-success")
      },
      prefill: {
        name: "<YOUR NAME>",
        email: "example@example.com",
        contact: "9999999999",
      },
      readonly: { email: true, contact: true },
      // notes: {
      //   address: "Example Corporate Office",
      // },
      theme: {
        color: "#5FCF80",
      },
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.on("payment.failed", function (response) {
      saveInCache("hasInitiatedPayment", false)
    })
    paymentObject.open()
  }

  const trainersPanel = () => {
    if (data.auth) {
      return null
    }
    return (
      <section id="trainers" className="trainers">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="member">
              <img src={data.mentorProfilePic} className="img-fluid" alt="" />
              <div className="member-content">
                <h4>{data.mentorName}</h4>
                <span>Mentor</span>
                <p>{data.category}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return !data ? (
    "Loading"
  ) : (
    <main data-testid="main">
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="container">
          <h2>{data.title}</h2>
          <p>{data.information}</p>
        </div>
      </div>

      <section id="course-details" className="course-details">
        <div className="container" data-aos="fade-up">
          <div className="row">
            {rightSidePanel()}
            {leftSidePanel()}
            {!isPaidCourse && getCompleteCourse()}
          </div>
        </div>
      </section>

      {trainersPanel()}
    </main>
  )
}
