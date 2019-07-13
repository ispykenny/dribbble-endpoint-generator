require("dotenv/config");
const axios = require("axios");
const clientSecret = process.env.CLIENT_SECRET;
const clientId = process.env.CLIENT_ID;
const express = require("express");
const app = express();
let accessToken = "";
let port = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/api-key", (req, res) => {
  // collect code
  let responseValue = req.query.code;
  let url = `https://dribbble.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&code=${responseValue}&redirect_uri=https://endpoint-generator-drib.herokuapp.com/api-key`;

  // request access token
  axios
    .post(url)
    .then(resp => {
      accessToken = resp.data.access_token;
      res.redirect(`/endpoint?access_token=${accessToken}`);
    })
    .catch(err => console.log("error happened!", err));
});

app.get("/endpoint", (req, res) => {
  let token = req.query.access_token;
  if (token) {
    res.render("pages/access_token", { tokenVal: token });
  } else {
    res
      .status(status)
      .res.send(
        "please add your access token to the url like shot?access_token=xyz"
      );
  }
});

app.listen(port, () => console.log("listening on port " + port));
