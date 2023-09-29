const https = require('https');
require('dotenv').config();
async function fetchData() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: process.env.BACKEND_URL,
      path: '/',
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

        res.on('end', () => {
        //   console.log("Req Sent to Server")
        resolve(data);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

module.exports = fetchData;
