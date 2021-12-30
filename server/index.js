import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import bodyParser from "body-parser"
import lodash from "lodash"
import ejs from "ejs"
import expressSession from "express-session"
import Razorpay from "razorpay"
import crypto from "crypto"
import { default as pgSession } from "connect-pg-simple"

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
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }, // 30 days
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

// app.get("/payment/logo.svg", (req, res) => {
//     process.stdout.write(`path${__dirname}`)
//     res.sendFile(path.join(__dirname, "logo.svg"))
// })

// app.post("/payment/orders", async (req, res) => {
//   process.stdout.write(`order`)
//   try {
//     const instance = new Razorpay({
//       key_id: "rzp_test_07EfSKjRh9HgqV",
//       key_secret: "OYxcIgSV0Fm1fEgYTiHCNefS",
//     })

//     const options = {
//       amount: 100, // amount in smallest currency unit
//       currency: "INR",
//       receipt: "receipt_order_74394",
//     }

//     const order = await instance.orders.create(options)

//     if (!order) return res.status(500).send("Some error occured")

//     res.json(order)
//   } catch (error) {
//     process.stdout.write(`error${error}`)
//     res.status(500).send(error)
//   }
// })

app.post("/api/payment/order", async (req, res) => {
  const courseID = req.body.courseID
  const isCorrect = req.body.isCorrect

  //process.stdout.write(`req body${req.body.courseID} ${req.body.isCorrect}`)

  //try {
  if (isCorrect === true) {
    res.status(200).json({
      status: "success",
      message: "Order placed. Please proceed to payment.",
      data: {
        retry: false,
        pgOrderID: "RZP_112",
        amount: "1.00",
      },
    })
  } else {
    res.status(500).json({
      status: "error",
      message: "Order placed. Please proceed to payment.",
      data: {
        retry: true,
        pgOrderID: "",
        amount: "",
      },
    })
  }
  // } catch (error) {
  //   process.stdout.write(`error${error}`)
  //   res.status(500).send(error)
  // }
})

app.post("/api/payment/verify", async (req, res) => {
  const { orderID, pgPaymentID, pgOrderID, pgSignature } = req.body.orderDetails
  const isCorrect = req.body.isCorrect

  if (isCorrect === true) {
    res.status(200).json({
      status: "success",
      message: "Payment successful",
    })
  } else {
    res.status(500).json({
      status: "error",
      message: "Payment failed",
    })
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
    if (digest !== razorpaySignature)
      return res.status(400).json({
        msg: "Transaction not legit!",
      })

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

app.get("/payment/crammn.svg", (req, res) => {
  process.stdout.write(`path${__dirname}`)
  res.sendFile(path.join(__dirname, "crammn.svg"))
})

// app.post("/payment/orders", async (req, res) => {
//   process.stdout.write(`order`)
//   try {
//     const instance = new Razorpay({
//       key_id: "rzp_test_07EfSKjRh9HgqV",
//       key_secret: "OYxcIgSV0Fm1fEgYTiHCNefS",
//     })

//     const options = {
//       amount: 100, // amount in smallest currency unit
//       currency: "INR",
//       receipt: "receipt_order_74394",
//     }

//     const order = await instance.orders.create(options)

//     if (!order) return res.status(500).send("Some error occured")

//     res.json(order)
//   } catch (error) {
//     process.stdout.write(`error${error}`)
//     res.status(500).send(error)
//   }
// })

// app.post("/payment/success", async (req, res) => {
//   try {
//     // getting the details back from our font-end
//     const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body

//     // Creating our own digest
//     // The format should be like this:
//     // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
//     const shasum = crypto.createHmac("sha256", "OYxcIgSV0Fm1fEgYTiHCNefS")

//     shasum.update(`${orderCreationId}|${razorpayPaymentId}`)

//     const digest = shasum.digest("hex")

//     // comaparing our digest with the actual signature
//     if (digest !== razorpaySignature) return res.status(400).json({ msg: "Transaction not legit!" })

//     // THE PAYMENT IS LEGIT & VERIFIED
//     // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

//     res.json({
//       msg: "success",
//       orderId: razorpayOrderId,
//       paymentId: razorpayPaymentId,
//     })
//   } catch (error) {
//     process.stdout.write(`success error${error}`)
//     res.status(500).send(error)
//   }
// })

// app.get("/api/courses", (req, res) => {
//   res.json(
//     allCourses.map((courseInfo, index) => {
//       const copyCourseInfo = JSON.parse(JSON.stringify(courseInfo))
//       //console.log("course info", copyCourseInfo)
//       process.stdout.write(`path${copyCourseInfo}`)
//       copyCourseInfo.detailsLink = copyCourseInfo.detailsLink.replace("{id_placeholder}", `/courses/details/${index}`)
//       delete copyCourseInfo.unsubscribedContent
//       delete copyCourseInfo.subscribedContent
//       return copyCourseInfo
//     })
//   )
// })

app.post("/api/courses", async (req, res) => {
  process.stdout.write(`courses`)
  const isCorrect = req.body.isCorrect
  if (isCorrect === true) {
    res.status(200).json({
      status: "success",
      data: [
        {
          courseID: 0,
          detailsLink: "/courses/details/0",
          detailThumbnail: "/assets/img/iitb-ae227-ammar.png",
          category: "IIT Bombay",
          price: "₹199 /-",
          title: "AE 227 - Solid Mechanics",
          information: "Learn all the important concepts of this course",
          mentorName: "Ammar",
          mentorProfilePic: "/assets/img/trainers/iitb-ammar.jpg",
          isPaid: true,
        },
        {
          courseID: 1,
          detailsLink: "/courses/details/1",
          detailThumbnail: "/assets/img/iitb-cs152-jaswanth.png",
          category: "IIT Bombay",
          price: "₹199 /-",
          title: "CS 152 - Inorganic Chemistry",
          information: "Learn all the important concepts of this course",
          mentorName: "Jaswanth",
          mentorProfilePic: "/assets/img/trainers/iitb-jaswanth.jpg",
          isPaid: true,
        },
        {
          courseID: 2,
          detailsLink: "/courses/details/2",
          detailThumbnail: "/assets/img/iitb-ch104-hanan.png",
          category: "IIT Bombay",
          price: "₹199 /-",
          title: "CH 104 - Inorganic Chemistry",
          information: "Learn all the important concepts of this course",
          mentorName: "Hanan",
          mentorProfilePic: "/assets/img/trainers/iitb-hanan.jpg",
          isPaid: false,
        },
        {
          courseID: 3,
          detailsLink: "/courses/details/3",
          detailThumbnail: "/assets/img/iitb-bb101-hanan.png",
          category: "IIT Bombay",
          price: "₹199 /-",
          title: "BB 101 - Basic Biology for Engineers",
          information: "Learn all the important concepts of this course",
          mentorName: "Hanan",
          mentorProfilePic: "/assets/img/trainers/iitb-hanan.jpg",
          isPaid: false,
        },
        {
          courseID: 4,
          detailsLink: "/courses/details/4",
          detailThumbnail: "/assets/img/iitb-hs101-keerthana.png",
          category: "IIT Bombay",
          price: "₹199 /-",
          title: "HS 101 - Economics",
          information: "Learn all the important concepts of this course",
          mentorName: "Keerthana",
          mentorProfilePic: "/assets/img/trainers/iitb-keerthana.jpg",
          isPaid: false,
        },
        {
          courseID: 5,
          detailsLink: "/courses/details/5",
          detailThumbnail: "/assets/img/iitb-ma108-preethi.png",
          category: "IIT Bombay",
          price: "₹199 /-",
          title: "MA 108 - Differential Equations",
          information: "Learn all the important concepts of this course",
          mentorName: "Preethi",
          mentorProfilePic: "/assets/img/trainers/iitb-preethi.jpg",
          isPaid: true,
        },
      ],
    })
  } else {
    res.status(400).json({
      status: "error",
      message: "Something went wrong. Please try later",
    })
  }
})

app.post("/api/course/details", async (req, res) => {
  const courseID = req.body.courseID
  const isCorrect = req.body.isCorrect
  if (isCorrect === true) {
    res.status(200).json({
      status: "success",
      data: {
        detailsLink: "{id_placeholder}",
        detailThumbnail: "/assets/img/iitb-bb101-hanan.png",
        category: "IIT Bombay",
        price: "₹199 /-",
        title: "BB 101 - Basic Biology for Engineers",
        information: "Learn all the important concepts of this course",
        mentorName: "Hanan",
        mentorProfilePic: "/assets/img/trainers/iitb-hanan.jpg",
        unsubscribedContent: {
          mainContent: [
            {
              videoLink: "https://www.youtube.com/embed/OlRzZddU1oY?rel=0",
              title: "Physical Biology",
              highlights:
                'This course summary is given by Hanan. Orginally taught by Professors Ambarish Kunwar & Neeta Kanekar, IIT Bombay. To get the full course, fill the form by clicking on "Get the Full Course." It\'s ₹199 /-.',
            },
          ],
          sideContent: [
            "Contents of the course",
            "Physical Biology",
            "Bio Medical 1: Overview of the Human Nervous System",
            "Bio Medical 2: Neuronal Language of Communication &amp; Electrical Signals of Neurons",
            "Bio Medical 3: Neuronal Axons as Electrical Conductors",
            "Bio Medical 4: Neuro-Muscular Junction Synaptic Transmission and Muscle Contraction",
            "Bio Medical 5: Neural(Neuro) Plascticity",
          ],
        },
        subscribedContent: {
          mainContent: [
            {
              videoLink: "https://www.youtube.com/embed/OlRzZddU1oY?rel=0",
              title: "Physical Biology",
            },
            {
              videoLink: "https://www.youtube.com/embed/NY-yCmQuX48?rel=0",
              title: "Bio Medical 1: Overview of the Human Nervous System",
            },
            {
              videoLink: "https://www.youtube.com/embed/rVee8MnPlbY?rel=0",
              title: "Bio Medical 2: Neuronal Language of Communication & Electrical Signals of Neurons",
            },
            {
              videoLink: "https://www.youtube.com/embed/h66J6a_JO_w?rel=0",
              title: "Bio Medical 3: Neuronal Axons as Electrical Conductors",
            },
            {
              videoLink: "https://www.youtube.com/embed/oNfaNnbYoZI?rel=0",
              title: "Bio Medical 4: Neuro-Muscular Junction Synaptic Transmission and Muscle Contraction",
            },
            {
              videoLink: "https://www.youtube.com/embed/RBjZsLJPdFs?rel=0",
              title: "Bio Medical 5: Neural (Neuro) Plasticity",
            },
          ],
          sideContent: [],
        },
      },
    })
  } else {
    res.status(400).json({
      status: "error",
      message: "Something went wrong. Please try later",
    })
  }
})

// app.get("/api/course/details", (req, res) => {
//   const courseAtId = JSON.parse(JSON.stringify(allCourses[req.query.id]))
//   if (!courseAtId) return res.render("error.html")

//   courseAtId.detailsLink = courseAtId.detailsLink.replace("{id_placeholder}", `/course/details/${req.query.id}`)
//   courseAtId.details = courseAtId.unsubscribedContent

//   if (!isUserNotInSession(req) && isUserProfileUpdated(req)) {
//     courseAtId.details = courseAtId.subscribedContent
//     courseAtId.auth = true
//   }

//   delete courseAtId.unsubscribedContent
//   delete courseAtId.subscribedContent

//   res.json(courseAtId)
// })

app.get("/api/user/details", async (req, res) => {
  if (await isUserNotInSession(req)) {
    // #TODO Error Handling Unauthorized API Access
    return res.json({
      authorized: false,
    })
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
  return res.json({
    saved: "ok",
  })
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
  process.stdout.write(req.url)
  res.render("index.html", {
    NODE_ENV,
  })
})

app.listen(PORT, async () => {
  let bannerPath = path.join(__dirname, "/banner.txt")
  await db.ping()
  process.stdout.write(
    fs.readFileSync(bannerPath, {
      encoding: "utf8",
      flag: "r",
    })
  )
  process.stdout.write("\n************************************************************\n")
  process.stdout.write(`SERVER STARTED @ ${PORT}\n`)
  process.stdout.write("************************************************************\n")
})
