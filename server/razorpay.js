import crypto from "crypto"
import Razorpay from "razorpay"
import allCourses from "./allCourses.js"

import * as db from "./db.js"

export async function razorpayOrder(req, res) {
  try {
    const instance = new Razorpay({
      //Test key
      key_id: "rzp_test_lpDvGOQmn11saq",
      key_secret: "Zwhqg8yzxVuzcWIzXnpePReJ",
    })

    // const courseDetails = JSON.parse(JSON.stringify(allCourses[req.body.courseId]))
    // const amount = parseInt(courseDetails.price.split(" ")[0].slice(1))
    // const userDetails = await db.fetchUserById("ebd11a8b-f3c1-4472-ae9c-815b93e02d7e")
    // const { name, id } = userDetails;

    const courseDetails = JSON.parse(JSON.stringify(allCourses[req.body.courseId]))
    const amount = parseInt(courseDetails.price.split(" ")[0].slice(1))
    // console.log(req.session.user.id, "========")
    console.log(req.session)
    const userDetails = await db.fetchUserById(req.session.user.id)
    const { name, id } = userDetails
    if (!name) {
      throw new Error("Missing field name")
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
    }

    instance.orders.create(options, async (err, order) => {
      if (err) {
        throw new Error("Some error while creating razorpay order")
      }

      // const orderCriteria = {
      //   userId: id,
      //   totalAmount: amount,
      //   razorpayOrderId: order.id,
      // }
      // const orderIdOfOrderTable = await db.createOrder(orderCriteria)

      const orderCriteria = {
        userId: req.session.user.id,
        totalAmount: amount,
        razorpayOrderId: order.id,
      }
      const orderIdOfOrderTable = await db.createOrder(orderCriteria)

      const userCourseCriteria = {
        userId: req.session.user.id,
        courseId: req.body.courseId,
        orderId: parseInt(orderIdOfOrderTable.id),
      }
      await db.saveUserCourse(userCourseCriteria)

      return res.status(200).json({ orderId: order.id })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ code: 500, message: error }).end()
  }
}

export async function verifySignature(req, res) {
  try {
    const criteria = { ...req.body }

    const signatureBody = criteria.razorpay_order_id + "|" + criteria.razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256", "Zwhqg8yzxVuzcWIzXnpePReJ").update(signatureBody.toString()).digest("hex")

    const retrievedOrderId = await db.getOrderIdFromOrder(criteria.razorpay_order_id)
    criteria.orderId = retrievedOrderId.id

    if (criteria.razorpay_signature === expectedSignature) {
      await db.updateOrderStatus(retrievedOrderId.id, "SUCCESS")
      await db.saveTransaction(criteria)
      await db.updateUserCourses(retrievedOrderId.id)
      return res.status(200).send({ code: 200, message: "Payment Successful." }).end()
    }

    await db.saveTransaction(criteria)
    await db.updateOrderStatus(retrievedOrderId.id, "FAILED")
    return res.status(403).send({ code: 403, message: "Signature not matched. Payment not Successful." }).end()
  } catch (error) {
    return res.status(500).send({ code: 404, message: error }).end()
  }
}
