var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

module.exports = () => {
    var app = express();

    app.use(bodyParser.json());

    app.use(check());

    consign()
        .include('controllers')
        .then('persistencia')
        .into(app);

    return app;
}