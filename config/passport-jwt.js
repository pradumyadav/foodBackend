
//import { Strategy } from "passport-local";
const passport = require("passport");

const User = require("../models/User");
// const { ExtractJwt } = require("passport-jwt");
 var jwtStrategy = require("passport-local").Strategy;

var ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrkey: "SECRET_KEY",
};

passport.use(
  new jwtStrategy(opts, function (jwt_Payload, done) {
    User.findOne({ _id: jwt_payload })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null.false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

passport.checkAuthentication = passport.authenticate("jwt", { session: false });

module.exports = passport;
