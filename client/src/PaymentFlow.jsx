import React from "react"
import axios from "axios"

const PaymentFlow = () => {
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
              const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

              if (!res) {
                        alert("Razorpay SDK failed to load. Are you online?")
                        return
                      }

              const result = await axios.post("/payment/orders")

              console.log("res", result)

              if (!result) {
                        alert("Server error. Are you online?")
                        return
                      }

              const { amount, id: order_id, currency } = result.data

              const options = {
                        key: "rzp_test_xhf7Dix6MwutHc", // Enter the Key ID generated from the Dashboard
                        amount: amount.toString(),
                        currency: currency,
                        name: "Soumya Corp.",
                        description: "Test Transaction",
                        order_id: order_id,
                        image: "/payment/logo.svg",
                        handler: async function (response) {
                                    const data = {
                                                  orderCreationId: order_id,
                                                  razorpayPaymentId: response.razorpay_payment_id,
                                                  razorpayOrderId: response.razorpay_order_id,
                                                  razorpaySignature: response.razorpay_signature,
                                                }

                                    const result = await axios.post("/payment/success", data)

                                    alert(result.data.msg)
                                  },
                        prefill: {
                                    name: "<YOUR NAME>",
                                    email: "example@example.com",
                                    contact: "9999999999",
                                  },
                        notes: {
                                    address: "Example Corporate Office",
                                  },
                        theme: {
                                    color: "#61dafb",
                                  },
                      }

              const paymentObject = new window.Razorpay(options)
              paymentObject.open()
            }

      return (
              <div className="App" style={{ position: "relative", top: 100, width: 500, height: 500 }}>
                <header className="App-header">
                  <p>Buy React now!</p>
                  <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹500
                  </button>
                </header>
              </div>
            )
}

export default PaymentFlow
