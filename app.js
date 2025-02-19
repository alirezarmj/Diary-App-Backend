const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user-routes");
const postRouter = require("./routes/post-routes");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/user", userRouter);
app.use("/posts", postRouter);

//Connection to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => app.listen(5000, () => console.log("Connection Successful & Listening to localhost 5000")))
  .catch((err) => console.log(err));
