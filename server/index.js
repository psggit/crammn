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
import * as razorpay from "./razorpay.js"

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

app.get("/payment/crammn.svg", (req, res) => {
  process.stdout.write(`path${__dirname}`)
  res.sendFile(path.join(__dirname, "crammn.svg"))
})

app.get("/api/courses", async (req, res) => {
  let paidCoursesId = []
  if (!isUserNotInSession(req)) {
    paidCoursesId = await db.fetchPaidCoursesOfUser(req.session.user.id)
  }
  res.json(
    allCourses.map((courseInfo, index) => {
      const copyCourseInfo = JSON.parse(JSON.stringify(courseInfo))
      copyCourseInfo.detailsLink = copyCourseInfo.detailsLink.replace("{id_placeholder}", `/courses/details/${index}`)
      copyCourseInfo.isPaid = false
      if (paidCoursesId.length) {
        if (paidCoursesId.includes(copyCourseInfo.courseId)) copyCourseInfo.isPaid = true
      }

      delete copyCourseInfo.unsubscribedContent
      delete copyCourseInfo.subscribedContent
      return copyCourseInfo
    })
  )
})

app.get("/api/course/details", async (req, res) => {
  const courseAtId = JSON.parse(JSON.stringify(allCourses[req.query.id]))
  if (!courseAtId) return res.render("error.html")

  courseAtId.detailsLink = courseAtId.detailsLink.replace("{id_placeholder}", `/course/details/${req.query.id}`)
  courseAtId.details = courseAtId.unsubscribedContent
  courseAtId.isPaid = false

  if (!isUserNotInSession(req) && isUserProfileUpdated(req)) {
    const paidCoursesId = await db.fetchPaidCoursesOfUser(req.session.user.id)
    if (paidCoursesId.includes(parseInt(req.query.id))) {
      courseAtId.details = courseAtId.subscribedContent
      courseAtId.auth = true
      courseAtId.isPaid = true
    }
  }

  delete courseAtId.unsubscribedContent
  delete courseAtId.subscribedContent

  console.log("courseId", courseAtId)

  res.json(courseAtId)
})

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

app.post("/api/createOrder", razorpay.razorpayOrder)
app.post("/api/payment/verify", razorpay.verifySignature)

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
  process.stdout.write(`NODE_ENV @ ${NODE_ENV}\n`)
  res.render("index.html")
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
  process.stdout.write(`NODE_ENV @ ${process.env.NODE_ENV}\n`)
  process.stdout.write("************************************************************\n")
})
