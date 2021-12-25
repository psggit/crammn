import React from "react"
import { navigate } from "@reach/router"
import { getSavedItem } from "./Utils/helpers"

const PaymentSuccess = () => {
  const handleClick = () => {
    navigate(`/courses/details/${getSavedItem("selectedCourseId")}`)
  }

  return (
    <main id="main">
      <section
        id="paymentSuccess"
        class="payment-success"
        //style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "calc(100vh - 462px - 73px - 60px)" }}
      >
        <div className="title" style={{ fontSize: 32, color: "#5FCF80", marginBottom: 40 }}>
          Payment Success
        </div>
        <div
          className="go-to-course"
          style={{ background: "#5fcf80", borderRadius: 50, padding: "8px 20px", fontSize: 15, color: "#fff", width: "fit-content", cursor: "pointer" }}
          onClick={handleClick}
        >
          Go to Course!
        </div>
      </section>
    </main>
  )
}

export default PaymentSuccess
