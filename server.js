import { config } from "dotenv";
config();
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import HttpError from "./models/httpError.js";
import menuRoutes from "./routes/menuRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import groceryRoutes from "./routes/groceryRoutes.js";
import dieticianRoutes from "./routes/dieticianRoutes.js";
import { loadStripe } from "@stripe/stripe-js";
import cors from "cors";
import User from "./models/userModel.js";
import path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const port = process.env.PORT || 5000;
const app = express();
console.log(__dirname);
// app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

const stripe = await loadStripe(
  "pk_test_51MsU99ESZ6jwBd5mZ07t7amESyMsjXDDVhGcdVnFbdkbpb0zYVmmw4RmFI5LshKqlIkPbzGhmLSMgfE4aY8AYVx400sfpkpWyQ"
);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_12345",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });

  res.json({ sessionId: session.id });
});

app.post("/stripe-webhook", async (req, res) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details.email;
    const paymentAmount = session.amount_total;
    const paymentMethod = session.payment_method_types[0];

    res.status(200).send();
  } else {
    res.status(400).send();
  }
});

// app.get("/usersMenus/:rid", async (req, res) => {
//   console.log("hey");
// });
//must use JWT Token

app.use("/api/menus", menuRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/grocery", groceryRoutes);
app.use("/api/dietician", dieticianRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

/*============================
        listen
=============================*/

app.listen(port, () => {
  console.log(`Server is runing at port ${port}`);
});

// /*=================================
//         Database
// ===================================*/
mongoose
  .connect(`mongodb+srv://Vicky:123456EAF@eaf.rhcan5b.mongodb.net/Eat&Fit`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

// Export the Express API
export default app;
