if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// Pending on client side - Validation on all forms

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const AppError = require("./utils/appError");
const campgroundsRouter = require("./routes/campgrounds");
const reviewsRouter = require("./routes/reviews");
const userRouter = require("./routes/user");
const session = require("express-session");
const catchAsync = require("./utils/catchAsync");

// ****************************** MIDDLEWARES ************************** //

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Setting View engine to ejs and views directory to '/views'
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Session configuration
const sessionConfig = {
  secret: "happysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

// ************************* EXPRESS ROUTES ************************ //

// Express Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/set-cookies",
  catchAsync((req, res) => {
    res.send(req.session);
    res.redirect();
  })
);

app.use("/api", userRouter);

app.use("/api/campgrounds", campgroundsRouter);

app.use("/api/campgrounds/:id/reviews", reviewsRouter);

// *****************Error handling Middlewares**************************

// app.all with a * path means all http verbs on any path...this is why the order matters
app.all("*", (req, res, next) => {
  throw new AppError("Invalid Endpoint", 404);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.message);
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

// Connecting to mongooose
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/beep-trip")
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((err) =>
    console.log("OH NO!! THERE WAS A PROBLEM WHILE CONNECTING TO THE DATABASE")
  );

// Starting the Server

const PORT = process.env.port || 7000;

app.listen(PORT, () => {
  console.log("LISTENING ON PORT 7000");
});

if (process.env.NODE_ENV === "production") {
}
