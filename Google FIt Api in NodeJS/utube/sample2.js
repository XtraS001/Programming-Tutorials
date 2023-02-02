const { google } = require('googleapis');
const queryString = require('query-string');
// Replace with your own client ID and secret
const CLIENT_ID = '363500610943-s4ro975gcndep5r9vbmodl8n7ppnt0lc.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

// Create a new OAuth2 client
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

// Generate a URL to request user authorization
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/fitness.activity.read'
});

console.log(`Authorize this app by visiting this url: ${authUrl}`);

// Once the user has granted authorization, exchange the authorization code for an access token
google.auth.getToken(code, (err, token) => {
  if (err) {
    console.error(`Error getting token: ${err}`);
    return;
  }

  // Set the token to the OAuth2 client
  oauth2Client.setCredentials(token);

  // Make a request to the Google Fit API to retrieve data from the user's account
  const fit = google.fitness({ version: 'v1', auth: oauth2Client });
  fit.users.dataSources.list({ userId: 'me' }, (err, data) => {
    if (err) {
      console.error(`Error retrieving data sources: ${err}`);
      return;
    }

    console.log(data);
  });
});
