const restify = require('restify-clients');

function CartoesCliente() {
    this._client = restify.createJsonClient({
        url: 'http://localhost:3001'
    });
}

CartoesCliente.prototype.autoriza = function (cartao, callback) {
    this._client.post('/cartoes/autoriza', cartao, callback);
}

module.exports = function () {
    return CartoesCliente;
}