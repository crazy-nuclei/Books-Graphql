const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use("/graphql", graphqlHttp({
    schema 
}));

module.exports = app;

