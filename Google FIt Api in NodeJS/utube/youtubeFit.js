const express = require("express");
const app = express();
const port = 1234;
const { google } = require("[googleapis]");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse");
const queryParse = require("query-string");
// import queryParse from 'query-string';
const bodyParser = require("body-parser");
const axios = require("axios");

// 363500610943-s4ro975gcndep5r9vbmodl8n7ppnt0lc.apps.googleusercontent.com
// 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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.status(200).send({
    tshirt: "blueshirt",
    size: "large",
  });
});

app.get("/getURLTing", (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    //client id
    "363500610943-s4ro975gcndep5r9vbmodl8n7ppnt0lc.apps.googleusercontent.com",
    //client security
    "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",
    // link to redirect to
    "http://localhost:1234/steps"
  );

  const scopes = [
    "https://www.googleapis.com/auth/fitness.activity.read",
    // "https://www.googleapis.com/auth/fitness.activity.read profile email openid",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userID: req.body.userid,
    }),
  });

  request(url, (err, response, body) => {
    console.log("error", err);
    console.log("statusCode:", response && response.statusCode);
    res.send({ url });
  });
});

app.get("/steps", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;

  const oauth2Client = new google.auth.OAuth2(
    //client id
    "363500610943-s4ro975gcndep5r9vbmodl8n7ppnt0lc.apps.googleusercontent.com",
    //client security
    "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",
    // link to redirect to
    "http://localhost:1234/steps"
  );

  const tokens = await oauth2Client.getToken(code);
  console.log("tokens in coming");
  console.log(tokens);
  console.log("finish print token")
  res.send("HELLO");

  let stepArray = [];

  try {
    const result = await axios({
      method: "POST",
      headers: {
        authorization: "Bearer" + tokens.tokens.access_token,
      },
      "Content-Type": "application/json",
      url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
      data: {
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId:
              "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
          },
        ],
        // bucketByTime: { durationMillis: 86400000 },
        // startTimeMillis: 1585785599000,
        // endTimeMillis: 1585785599000,
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis:  1672134137000,
        endTimeMillis:    1672134157000,
      },
    });
    console.log(result);
    // stepArray = result.data.bucket;
  } catch (e) {
    console.log(e);
  }

  // try {
  //   console.log("8888dataset");
  //   for (const dataSet of stepArray) {
  //     console.log(dataSet);
  //   }
  //   console.log("finishdataset")
  // } catch (e) {
  //   console.log(e);
  // }
});

app.listen(port, () =>
  console.log(
    `GOOGLE FIT IT LISTENING ON PORT ${port} http://localhost:${port}`
  )
);
