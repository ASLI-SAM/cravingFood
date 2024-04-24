const pgCon = require("pg");
require("dotenv").config();

// const pool = new Pool({
//   connectionString:
//     "postgres://root:TrjuvYHeRfF1pBPw2EnThemLpDXM5aoe@dpg-cnjjlemn7f5s73f9n7u0-a.oregon-postgres.render.com/postgres_food",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const config = {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "1234",
};

let connectDB = new pgCon.Pool(config);
// connectDB.connect();
orderId = Date.now();
const data = {
  customer: {
    address: {
      line1: "church",
      city: "uk",
      postal_code: "1234",
      state: "texas",
    },
    email: "gh@gmail.com",
    name: "NOje",
  },
  items: [
    {
      productId: "1709973230771",
      quantity: 2,
    },
  ],
  total: 250,
  usreId: "3tAIimaEZbVCACKf8np9jSDFo7s2",
};

// const dateObj = new Date()
// const date = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate());  // 2009-11-10
// const month = date.toLocaleString('default', { month: 'short' });

// console.log(`${date.getDate()} ${month} ${date.getFullYear()}`);

const today = new Date(1710311498714);
today.setDate(today.getDate());
const f = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
});
const yesterday = new Date().setDate(today.getDate() - 1);
console.log(f.format(today));

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({
//     body: "*Thanks for shopping at Craving Food* Your order id 1234 is preparing now. It will be delivered within 45min. we strive to continuously improve our customer experience ",
//     from: 'whatsapp:+14155238886',
//     to: 'whatsapp:+916382554494'
//   })
//   .then((message) => console.log(message.sid));

// const phoneNumber = connectDB.query(`select contactno from users as u join orders as od on u.id = od.userid where od.order_id = '1711432932651'`,(err, result) => {
//   if(!err) console.log(result.rows[0].contactno)
// })

module.exports = connectDB;
