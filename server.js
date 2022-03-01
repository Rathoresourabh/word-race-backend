const cors = require("cors");
const express = require("express");

const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

const dbURL =
  "mongodb+srv://voxies:voxies@cluster0.kmql7.mongodb.net/wordRace?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then(() => console.log("connected to DB successfully"))
  .catch((err) => console.log("couldn't connect to database:", err.message));

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.disable("x-powered-by");
app.use("/api", indexRouter);

let PORT = 5000;
// PORT number
app.listen(5000, function () {
  console.log(`App started at port number 5000`);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`Error\n${err.status}`);
});

module.exports = app;
