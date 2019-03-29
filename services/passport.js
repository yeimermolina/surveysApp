const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const moongose = require("mongoose");
const keys = require("../config/keys");

const User = moongose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      new User({
        googleId: profile.id
      }).save();
    }
  )
);
