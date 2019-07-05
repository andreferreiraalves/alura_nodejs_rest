function PagamentoDAO(pool) {
    this._pool = pool;
}

PagamentoDAO.prototype.salva = function (pagamento, callback) {
    console.log(pagamento);
    this._pool.query(`INSERT INTO pagamentos(forma_pagamento, valor, moeda, status, data, descricao) VALUES ($1, $2, $3, $4, $5, $6)`,
        [pagamento.forma_de_pagamento, pagamento.valor, pagamento.moeda, pagamento.status, pagamento.data, pagamento.descricao], callback);
}

PagamentoDAO.prototype.lista = function (callback) {
    this._pool.query('select * from pagamentos', callback);
}

PagamentoDAO.prototype.buscaPorId = function (id, callback) {
    this._pool.query('select * from pagamentos where id = ?', [id], callback);
}

module.exports = function () {
    return PagamentoDAO;
}