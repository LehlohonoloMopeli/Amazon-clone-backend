/* eslint-disable */ 

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('pk_test_51IGloHBskh1aSg7kuKz6P4ZvjzHbKcpRKca1nycs5fSFFUieg9KAE3r2Mav6U1F7yk4whfGgJgRon3ZSokKBcHEc00pg9M3Y1g')


// API


// API Config
const app = express();


// Middlewares
app.use(cors({ origin: true}));
app.use(express.json());            // Allows us to send data in json format


// API routes
app.get('/', (req, res) => res.status(200).send('Hello Express!'));

app.post('/create_payments', async (req, res) => {
    const total = req.query.total;

    const paymentIntent = await stripe.paymentIntents.create({      // Standard definition from Stripe
        amount: total,
        currency: 'usd',
      });

    // Ok - Created  (response after the post)
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})


// Listen Command
exports.api = functions.https.onRequest(app)


// Example endpoint
// http://localhost:5001/e-clone-43fb1/us-central1/api      (baseUrl for payments to be setup in axios)  (can be hosted alone)
