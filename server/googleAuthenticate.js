import goggleAuthLib from "google-auth-library"

const CLIENT_ID = "86586798573-o43mavsuo9aclh25qb2jn9vkcnpo63bt.apps.googleusercontent.com"

const client = new goggleAuthLib.OAuth2Client(CLIENT_ID)

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  })
  const payload = ticket.getPayload()
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return payload
}
export default async function googleAuthenticate(req, res) {
  const token = req.body.credential

  const userDetails = await verify(token)
  console.log("============ GOOGLE USER CREDENTIALS START ============")
  console.log(JSON.stringify(userDetails, null, 2))
  console.log("============ GOOGLE USER CREDENTIALS END ============")
  return userDetails
}
