const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('../util/logger');

module.exports = function () {
    var app = express();

    app.use(bodyParser.json());

    app.use(morgan('common', {
        stream: {
            write: function (message) {
                logger.info(message);
            }
        }
    }));

    consign()
        .include('controllers')
        .then('persistencia')
        .then('servicos')
        .into(app);

    return app;
}