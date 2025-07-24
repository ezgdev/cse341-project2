const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const app = express();
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github").Strategy;
const cors = require("cors");

const port = process.env.PORT || 3001;

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: true,
    })
  )
  // This is the basic express session initialization
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  // allow passport to use express sessions
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }))
  .use("/", require("./routes"));

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate({ githubId: profile.id }, (err, user) => {
      return done(null, profile);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayname}`
      : "Logged Out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect("/");
  }
);

mongodb.initDb((err) => {
  if (err) {
    console.log("Failed to connect to the database:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
