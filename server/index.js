import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import bodyParser from "body-parser"
import lodash from "lodash"
import ejs from "ejs"
import expressSession from "express-session"
import { default as pgSession } from "connect-pg-simple"
import crypto from "crypto"
import Razorpay from "razorpay"

import allCourses from "./allCourses.js"
import googleAuthenticate from "./googleAuthenticate.js"
import * as db from "./db.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { NODE_ENV } = process.env
const PORT = process.env.port || 3001
const app = express()
const pgSessionConfigured = pgSession(expressSession)

app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
)
app.use(express.static("public"))
app.set("views", "public")
app.engine("html", ejs.renderFile)

app.use(
  expressSession({
    store: new pgSessionConfigured({
      pool: db.pool,
    }),
    secret: "21c5e2e2-5f07-4f2d-9fbc-3b2a172bc28f",
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
)

function isUserNotInSession(req) {
  return lodash.isNull(lodash.get(req, "session.user.id", null))
}

async function isUserProfileUpdated(req) {
  if (isUserNotInSession(req)) {
    return false
  }
  const userInfo = await db.fetchUserById(req.session.user.id)
  return userInfo.profile_updated
}

app.get("/signout", (req, res) => {
  req.session.destroy()

  return res.redirect("/courses")
})

app.get("/payment/logo.svg", (req, res) => {
      process.stdout.write(`path${__dirname}`)
      res.sendFile(path.join(__dirname, "logo.svg"))
})

app.post("/payment/orders", async (req, res) => {
      process.stdout.write(`order`)
      try {
              const instance = new Razorpay({
                        key_id: "rzp_test_xhf7Dix6MwutHc",
                        key_secret: "Ks2WKkQ1t8znBEyOlZBv1YCo",
                      })

              const options = {
                        amount: 100, // amount in smallest currency unit
                        currency: "INR",
                        receipt: "receipt_order_74394",
                      }

              const order = await instance.orders.create(options)

              if (!order) return res.status(500).send("Some error occured")

              res.json(order)
            } catch (error) {
                    process.stdout.write(`error${error}`)
                    res.status(500).send(error)
                  }
})

app.post("/payment/success", async (req, res) => {
      try {
              // getting the details back from our font-end
              const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body
          
                  // Creating our own digest
                      // The format should be like this:
                          // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
                              const shasum = crypto.createHmac("sha256", "OYxcIgSV0Fm1fEgYTiHCNefS")
          
                                  shasum.update(`${orderCreationId}|${razorpayPaymentId}`)
          
                                      const digest = shasum.digest("hex")
          
                                          // comaparing our digest with the actual signature
                                              if (digest !== razorpaySignature) return res.status(400).json({ msg: "Transaction not legit!" })
          
                                                  // THE PAYMENT IS LEGIT & VERIFIED
                                                      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
          
                                                          res.json({
                                                                msg: "success",
                                                                      orderId: razorpayOrderId,
                                                                            paymentId: razorpayPaymentId,
                                                                                })
                                                                                  } catch (error) {
                                                                                      process.stdout.write(`success error${error}`)
                                                                                          res.status(500).send(error)
                                                                                            }
                                                                                            })

app.get("/api/courses", (req, res) => {
  res.json(
    allCourses.map((courseInfo, index) => {
      const copyCourseInfo = JSON.parse(JSON.stringify(courseInfo))
      copyCourseInfo.detailsLink = copyCourseInfo.detailsLink.replace("{id_placeholder}", `/courses/details/${index}`)
      delete copyCourseInfo.unsubscribedContent
      delete copyCourseInfo.subscribedContent
      return copyCourseInfo
    })
  )
})

app.get("/api/course/details", (req, res) => {
  const courseAtId = JSON.parse(JSON.stringify(allCourses[req.query.id]))
  if (!courseAtId) return res.render("error.html")

  courseAtId.detailsLink = courseAtId.detailsLink.replace("{id_placeholder}", `/course/details/${req.query.id}`)
  courseAtId.details = courseAtId.unsubscribedContent

  if (!isUserNotInSession(req) && isUserProfileUpdated(req)) {
    courseAtId.details = courseAtId.subscribedContent
    courseAtId.auth = true
  }

  delete courseAtId.unsubscribedContent
  delete courseAtId.subscribedContent

  res.json(courseAtId)
})

app.get("/api/user/details", async (req, res) => {
  if (await isUserNotInSession(req)) {
    // #TODO Error Handling Unauthorized API Access
    return res.json({ authorized: false })
  }

  const { name, email, profile_updated } = await db.fetchUserById(req.session.user.id)

  return res.json({
    authorized: true,
    name,
    email,
    profileUpdated: profile_updated,
  })
})

app.post("/api/user/details", async (req, res) => {
  if (await isUserNotInSession(req)) {
    // #TODO Error Handling Unauthorized API Access
    return res.json({})
  }

  const values = req.body
  await db.saveProfile(req.session.user.id, values)
  return res.json({ saved: "ok" })
})
app.post("/auth/google/callback", async (req, res) => {
  const googleUser = await googleAuthenticate(req, res)
  const isAlreadyCrammnUser = await db.isUserPresent(googleUser.email)
  const persistedUser = await db.upsertUserInformation(googleUser.email, googleUser.name, googleUser)
  req.session.user = {
    id: persistedUser.user_id,
  }
  await req.session.save()
  if (isAlreadyCrammnUser) {
    //return to signup
    return res.redirect("/signup")
  }
  // return to where the user came from
  // Finally catch all return to the courses page
  return res.redirect("/courses")
})

app.use("*", function (req, res) {
  res.render("index.html", { NODE_ENV })
})

app.listen(PORT, async () => {
  let bannerPath = path.join(__dirname, "/banner.txt")
  await db.ping()
  process.stdout.write(fs.readFileSync(bannerPath, { encoding: "utf8", flag: "r" }))
  process.stdout.write("\n************************************************************\n")
  process.stdout.write(`SERVER STARTED @ ${PORT}\n`)
  process.stdout.write("************************************************************\n")
})
