import pg from "pg"
import lodash from "lodash"
import dotenv from "dotenv"
dotenv.config();

const { Pool } = pg
const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log("************************************")
console.log("************************************")
console.log(JSON.stringify(config))
console.log("************************************")
console.log("************************************")
console.log("************************************")
const pool = new Pool(config)

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
        "ON CONFLICT (id)" + // Needed As we have added user_profile_pkey should be modified once we decide and settle of primary key
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

export async function createOrder(criteria){
  try {
    //Make order table primary key auto increment
    const res = await pool.query(
      `INSERT INTO orders (status, user_id, total_amount, created_at, updated_at,razorpay_order_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [ `PENDING_PAYMENT`, criteria.userId, criteria.totalAmount, nowInUTC(), nowInUTC(), criteria.razorpayOrderId]
    )

    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    else{
      throw new Error("Error in saving order");
    }
  } catch (err) {
    return err.toString();
  }
}

export async function saveUserCourse(criteria){
  try {
    const res = await pool.query(
      "INSERT INTO user_courses (user_id, course_id, expires_at, created_at, updated_at, order_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [criteria.userId, criteria.courseId, nowInUTC(), nowInUTC(), nowInUTC(), criteria.orderId]
    )
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    else{
      throw new Error("Error in saving user course");
    }
  }
  catch (err) {
    return err.toString();
  }
}

export async function fetchPaidCoursesOfUser(userId){
  try {
    const res = await pool.query(
      "SELECT * FROM user_courses join user_profile on user_courses.user_id=user_profile.id WHERE user_profile.user_id=$1 AND expires_at > $2",
      [userId, nowInUTC()]
    )
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      let courseIds = [];
      res.rows.map(row => courseIds.push(row.course_id))
      return courseIds;
    }
    else{
      throw new Error("Error in fetching paid courses of user");
    }
  }
  catch (err) {
    return err.toString();
  }
}

export async function updateOrderStatus(orderId, status){
  try {
    const res = await pool.query(
      "UPDATE orders SET status=$2, updated_at=$3 WHERE id=$1",
      [orderId, status, nowInUTC()]
    )
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    else{
      throw new Error("Error in updating order status");
    }
  }
  catch (err) {
    return err.toString();
  }
}

export async function saveTransaction(criteria){
  try {
    const res = await pool.query(
      "INSERT INTO transactions ( order_id, pg_order_id, pg_payment_id, pg_signature, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [criteria.orderId, criteria.razorpay_order_id, criteria.razorpay_payment_id, criteria.razorpay_signature, nowInUTC(), nowInUTC()]
    )
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    else{
      throw new Error("Error in saving transaction");
    }
  }
  catch (err) {
    return err.toString();
  }
}

const nextYear = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  return date.toISOString()
}

export async function updateUserCourses(orderId){
  try {
    const res = await pool.query(
      "UPDATE user_courses SET expires_at=$2, updated_at=$3 WHERE order_id=$1",
      [orderId, nextYear(), nowInUTC()]
    )
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    else{
      throw new Error("Error in updating user courses");
    }
  }
  catch (err) {
    return err.toString();
  }
}

export async function getOrderIdFromOrder(orderId){
  try {
    const res = await pool.query(
      "SELECT id FROM orders WHERE razorpay_order_id=$1",
      [orderId]
    )
    if (!lodash.isNull(lodash.get(res, "rows[0]"))) {
      return lodash.get(res, "rows[0]")
    }
    else{
      throw new Error("Error in fetching order");
    }
  }
  catch (err) {
    return err.toString();
  }
}

