const router = require("express").Router();
const express = require("express");
const admin = require("firebase-admin");
const { Pool } = require("pg");
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const connectDB = require("../postgresDB");

// const pool = new Pool({
//   connectionString:
//     "postgres://root:TrjuvYHeRfF1pBPw2EnThemLpDXM5aoe@dpg-cnjjlemn7f5s73f9n7u0-a.oregon-postgres.render.com/postgres_food",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const db = admin.firestore();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/create", async (req, res) => {
  try {
    const id = Date.now();
    const data = {
      product_id: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      offer: req.body.offer,
      imageURL: req.body.imageURL,
    };

    connectDB.connect();
    const item = connectDB.query(
      `insert into "products" (id, product_name, category, price, offer, imageURL) 
        values($1, $2, $3, $4, $5, $6)`,
      [
        data.product_id,
        data.product_name,
        data.product_category,
        data.product_price,
        data.offer,
        data.imageURL,
      ],
      (err, res) => {
        if (!err) console.log("success");
        else console.log(err.message);
      }
    );

    const response = await db.collection("products").doc(`/${id}`).set(data);
    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.send({ success: false, msg: `Error : ${err}` });
  }
});

// getall the products
router.get("/all", async (req, res) => {
  (async () => {
    try {
      connectDB.connect();
      const products = await connectDB.query("select * from products");

      let query = db.collection("products");
      let response = [];

      // await query.get().then((querysnap) => {
      //   let docs = querysnap.docs;
      //   docs.map((doc) => {
      //     response.push({ ...doc.data() });
      //   });
      //   return response;
      // });
      return res.status(200).send({ success: true, data: products.rows });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
});

// Delete item
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    connectDB.connect();
    const deleteItem = connectDB.query(
      `delete from products where id = $1`,
      [productId],
      (err, res) => {
        if (!err) console.log("success");
        else console.log(err.message);
        connectDB.end;
      }
    );
    await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// Create a Cart

router.post("/addToCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.id;
  console.log(userId);
  console.log(productId);
  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItem });
    } else {
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_category: req.body.category,
        product_price: req.body.price,
        imageURL: req.body.imageurl,
        quantity: 1,
      };
      const addItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addItems });
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// update cart to increase and decrease the quantity
router.post("/updateCart/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.query.productId;
  const type = req.query.type;

  try {
    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .update({ quantity });
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        if (doc.data().quantity === 1) {
          await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .delete()
            .then((result) => {
              return res.status(200).send({ success: true, data: result });
            });
        } else {
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        }
      }
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

// get all the cartitems for that user
router.get("/getCartItems/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  (async () => {
    try {
      let query = db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");
      let response = [];

      await query.get().then((querysnap) => {
        let docs = querysnap.docs;

        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :,${err}` });
    }
  })();
});

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.user_id,
      cart: JSON.stringify(req.body.data.cart),
      total: req.body.data.total,
      contactno: req.body.data.contactno,
    },
  });
  console.log(`whatsapp:+91${customer.metadata.contactno}`);
  const line_items = req.body.data.cart.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product_name,
          images: [item.imageURL],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["US", "IN"] },

    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 2 },
            maximum: { unit: "hour", value: 4 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },

    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url });
});

let endpointSecret;
// let endpointSecret = process.env.WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let eventType;
    let data;

    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers.retrieve(data.customer).then((customer) => {
        // console.log("Customer details", customer);
        // console.log("Data", data);
        createOrder(customer, data, res);
      });
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

const createOrder = async (customer, intent, res) => {
  console.log("Inside the orders");
  const d = new Date();
  try {
    const orderId = d.getTime();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
      date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
    };
    connectDB.connect();
    const order = connectDB.query(
      `insert into orders (order_id, line1,city, postal_code,state,email,name, item, quantity,sts, total, userid, date) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [
        orderId,
        data.customer.address.line1,
        data.customer.address.city,
        data.customer.address.postal_code,
        data.customer.address.state,
        data.customer.email,
        data.customer.name,
        data.items[0].productId,
        data.items[0].quantity,
        data.sts,
        data.total,
        data.userId,
        data.date,
      ],
      (err, res) => {
        if (!err) console.log("order inserted");
        else console.log(err.message);
      }
    );
    await db.collection("orders").doc(`/${orderId}/`).set(data);
    await deleteCart(
      customer.metadata.user_id,
      JSON.parse(customer.metadata.cart)
    );
    console.log("*****************************************");

    console.log(`whatsapp:+91${customer.metadata.contactno}`);
    await client.messages
      .create({
        body: `*Thanks for shopping at Craving Food* Your order id ${orderId} is preparing now. It will be delivered within 45min. we strive to continuously improve our customer experience `,
        from: "whatsapp:+14155238886",
        to: `whatsapp:+91${customer.metadata.contactno}`,
      })
      .then((message) => console.log(message.sid));
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const deleteCart = async (userId, items) => {
  console.log("Inside the delete");

  console.log("*****************************************");
  items.map(async (data) => {
    console.log("-------------------inside--------", userId, data.productId);
    await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${data.productId}/`)
      .delete()
      .then(() => console.log("-------------------successs--------"));
  });
};

router.get("/orders", async (req, res) => {
  (async () => {
    const orders = connectDB.query(
      `select * from users as u inner join orders as od
      on u.id = od.userid
      inner join products as pd
      on od.item = pd.id order by od.order_id desc
       `,
      (err, result) => {
        const response = [];
        result.rows.map((item) => {
          response.push({ ...item });
        });

        if (!err) {
          return res.status(200).send({ success: true, data: response });
        } else console.log(err.message);
        connectDB.end();
      }
    );

    try {
      let query = db.collection("orders");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      // return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
});

router.post("/updateOrder/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  const sts = req.query.sts;
  try {
    connectDB.connect();
    const update = connectDB.query(
      `update orders set sts = '${sts}' where order_id = '${order_id}' `,
      (err, result) => {
        if (!err) {
          return res.send({ success: true });
        } else console.log(`Error in update ${err}`);
      }
    );

    connectDB.query(
      `select contactno from users as u join orders as od on u.id = od.userid where od.order_id = '${order_id}'`,
      (err, result) => {
        if (!err) {
          client.messages
            .create({
              body: `*Thanks for shopping at Craving Food* Your order id *${order_id}* has been *${sts}* successfuly. we strive to continuously improve our customer experience `,
              from: "whatsapp:+14155238886",
              to: `whatsapp:+91${result.rows[0].contactno}`,
            })
            .then((message) => console.log(message.sid));
        } else {
          console.log(err);
        }
      }
    );

    const updatedItem = await db
      .collection("orders")
      .doc(`/${order_id}/`)
      .update({ sts });
    console.log(updatedItem);
    // return res.status(200).send({ success: true, data: updatedItem });
  } catch (er) {
    return res.send({ success: false, msg: `Error :,${er}` });
  }
});

// Add reviews
router.post("/addReviews/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderId = req.body.data.order_id;
    const productId = req.body.data.item;
    const product_name = req.body.data.product_name;
    const review = req.body.review;
    const stars = req.body.reviewStar;
    const data = {
      review_id: Date.now(),
      userId,
      orderId,
      productId,
      product_name,
      review,
      stars,
    };

    const reviewQuery = connectDB.query(
      `insert into reviews (id, order_id, user_id, product_id, product_name, review, stars) values($1,$2,$3,$4,$5,$6,$7)`,
      [
        data.review_id,
        data.orderId,
        data.userId,
        data.productId,
        data.product_name,
        data.review,
        data.stars,
      ],
      (err, result) => {
        if (!err) {
          console.log("review added");
          return res.send({ success: true });
        } else console.log(err);

        connectDB.end();
      }
    );

    const doc = await db
      .collection("reviews")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      await db
        .collection("reviews")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ review, stars });
    } else {
      await db
        .collection("reviews")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
    }
    // return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    return res.send({ success: false, msg: `Error :${err}` });
  }
});

router.get("/getReviews", async (req, res) => {
  const userId = "qWt9GnkamGht922FlXap3paBLkp2";
  const response = [];
  const reviews = connectDB.query(
    `select * from reviews join users on reviews.user_id = users.id order by reviews.id desc`,
    (err, result) => {
      if (!err) {
        result.rows.map((rev) => {
          response.push({ ...rev });
        });
        return res.send({ success: true, data: response });
      }
    }
  );
});

module.exports = router;
