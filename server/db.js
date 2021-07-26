import pg from "pg"
import lodash from "lodash"

const { Pool } = pg

export const pool = new Pool({
  user: "postgres",
  host: "cramm-dev.ckkkxicgnwqj.ap-south-1.rds.amazonaws.com",
  database: "postgres",
  password: "dGZcJwssVhzEU8dygtvA",
  port: 5432,
})

export async function ping() {
  try {
    const res = await pool.query("SELECT NOW() as now")
    console.log(res.rows[0])
  } catch (err) {
    console.log(err.stack)
  }
}

export async function isUserPresent(email) {
  try {
    const res = await pool.query("SELECT email FROM user_profile WHERE email=$1 AND profile_updated=$2", [email, true])
    return !lodash.isNull(lodash.get(res, "rows[0].email"))
  } catch (err) {
    console.log(err.stack)
  }
}

export async function fetchUserById(id) {
  try {
    const res = await pool.query("SELECT * FROM user_profile WHERE user_id=$1", [id])
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    // #TODO Throwing an Error here
  } catch (err) {
    console.log(err.stack)
  }
}

const nowInUTC = () => {
  return new Date().toISOString()
}
export async function upsertUserInformation(email, name, googleUserInfo) {
  try {
    const res = await pool.query(
      "INSERT INTO user_profile (email, name, google_account_info, updated_at) VALUES ($1, $2, $3, $4)" +
        "ON CONFLICT (email)" +
        "DO UPDATE SET " +
        "name = EXCLUDED.name," +
        "google_account_info = EXCLUDED.google_account_info," +
        "updated_at = EXCLUDED.updated_at " +
        "RETURNING *",
      [email, name, googleUserInfo, nowInUTC()]
    )
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    // #TODO Throwing an Error here
  } catch (err) {
    console.log(err.stack)
    // #TODO Throwing An DB Write Error Here
  }
}

export async function saveProfile(userId, { college, stream, phoneNumber }) {
  try {
    const res = await pool.query(
      "UPDATE user_profile SET " + "college=$2, " + "stream=$3, " + "phone_number=$4, " + "profile_updated=$5," + "updated_at=$6 " + "WHERE user_id=$1 " + "RETURNING *",
      [userId, college, stream, phoneNumber, true, nowInUTC()]
    )
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    // #TODO Throwing an Error here
  } catch (err) {
    console.log(err.stack)
    // #TODO Throwing An DB Write Error Here
  }
}
