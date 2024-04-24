const router = require("express").Router();
const admin = require("firebase-admin");
const { Pool } = require("pg");
require("dotenv").config();
const connectDB = require("../postgresDB");
const { query, response } = require("express");

let data = [];

// pool.connect();

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerfication", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token Not Found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    const reponse = [];
    if (!decodedValue) {
      return res
        .status(500)
        .json({ success: false, msg: "Unauthorized access" });
    }
    connectDB.connect();
    const userExits = await connectDB.query(
      ` select id from users where id = $1`,
      [decodedValue.user_id]
    );
    // console.log(userExits)
    if (userExits.rowCount === 0) {
      const user = connectDB.query(
        `insert into users (id, user_name, picture, email, verified) values ($1, $2, $3, $4, $5)`,
        [
          decodedValue.user_id,
          decodedValue.name,
          decodedValue.picture,
          decodedValue.email,
          decodedValue.email_verified,
        ],
        (err, res) => {
          if (!err) console.log("success");
          else console.log(err.message);
        }
      );
    }

    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token : ${err}`,
    });
  }
});

const listALlUsers = async (nextpagetoken) => {
  admin
    .auth()
    .listUsers(1000, nextpagetoken)
    .then((listuserresult) => {
      listuserresult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
      if (listuserresult.pageToken) {
        listALlUsers(listuserresult.pageToken);
      }
    })
    .catch((er) => console.log(er));
};

listALlUsers();

router.get("/all", async (req, res) => {
  listALlUsers();
  try {
    return res
      .status(200)
      .send({ success: true, data: data, dataCount: data.length });
  } catch (er) {
    return res.send({
      success: false,
      msg: `Error in listing users :,${er}`,
    });
  }
});

router.get("/getUserProfile/:userId", async (req, res) => {
  const userId = req.params.userId;
  connectDB.connect();

  const profile = connectDB.query(
    `select * from users where id = $1 `,
    [userId],
    (err, result) => {
      if (!err) {
        return res.send({ data: result.rows });
      }
    }
  );
});

router.post("/updateUserProfile/:email", async (req, res) => {
  const details = {
    name : req.body.name,
    number : req.body.number,
    email : req.body.email,
    street : req.body.street,
    city : req.body.city,
    pinCode : req.body.pinCode,
    state : req.body.state
  };

  console.log(details)

  connectDB.connect();
  const updateDeatils = connectDB.query(
    `update users  set user_name='${details.name}', street='${details.street}', city='${details.city}', pincode='${details.pinCode}', state='${details.state}', contactno='${details.number}' where email = '${details.email}'`, (err, result) => {
      if(!err) console.log("success")
      else console.log(err)
    }
  )
  return res.status(200).send({ success: true });
});

module.exports = router;
