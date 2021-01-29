const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');

const route = require('./api/routes/pagesNames')

const app = express();

require('./db')()

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());

app.use(cors({credentials: true, origin: true}));

app.use(route)

const http = require('http');

const port = 5000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Listening on port: ', port);
})