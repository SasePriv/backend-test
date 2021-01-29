const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const http = require('http');
const https = require('https');
const route = require('./api/routes/pagesNames')

const app = express();

//Database
require('./db')()

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());

app.use(cors({credentials: true, origin: true}));

//Routes
app.use(route)

//Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/amagpieinthesky.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/amagpieinthesky.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/amagpieinthesky.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const portHttp = 5001;
const portHttps = 5000;

httpServer.listen(portHttp, () => {
    console.log('Listening on port: ', portHttp);
})

httpsServer.listen(portHttps, () => {
    console.log('Listening on port: ', portHttps);
})