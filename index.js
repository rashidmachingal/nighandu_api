const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

//routes
const authRoute = require("./src/routes/auth.js")
const meaningRoute = require("./src/routes/word.js")
const contactRoute = require("./src/routes/contact.js")

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/", authRoute)
app.use("/api", meaningRoute);
app.use("/api", contactRoute);

// mongodb connection + // server configuration
app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server running`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection succesful")
  })
  .catch((err) => {
    console.log(err);
  });