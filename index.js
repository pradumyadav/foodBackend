const express = require("express");
const cors = require("cors");

const session = require("express-session");

const app = express();
const port = 8080;

//Import database confi....
const db = require("./config/mongoose");

//Import Passport Config.....
const passport = require("./config/passport-local");
const passportJWT = require("./config/passport-jwt");

const routes = require("./Routers/index");
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

app.listen(port, () => {
  console.log(`app is runnning on port ${port}`);
});
