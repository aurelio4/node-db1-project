const express = require("express");
const accountsRoute = require('../routes/accounts')
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/accounts', accountsRoute);

module.exports = server;