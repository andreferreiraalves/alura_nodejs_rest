const { check, validationResult } = require('express-validator');

module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {
        res.send('ok');
    });

    app.post('/pagamentos/pagamento',
        check('pagamento.forma_de_pagamento', 'Forma de pagamento é obrigatória.').not().isEmpty(),
        check('pagamento.valor', 'Valor é obrigatório e deve ser um decimal.').not().isEmpty(),
        check('pagamento.moeda', 'Moeda é obrigatória e deve ter 3 caracteres.').not().isEmpty(),

        function (req, res) {
            let pagamento = req.body.pagamento;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('Erros de validação encontrados');
                res.status(400).send(errors.array());
                return;
            }

            console.log('processando pagamento');

            let pool = app.persistencia.connectionFactory();
            let pagamentoDao = new app.persistencia.PagamentoDAO(pool);
            let catoesCliente = new app.servicos.cartoesCliente();

            pagamento.status = 'CRIADO';
            pagamento.data = new Date;

            if (req.body.cartao) {
                catoesCliente.autoriza(req.body.cartao, function (err, request, response, retorno) {
                    if (err) {
                        console.log('erro ao consultar o serviço de cartões');
                        res.status(400).send(err);
                        return;
                    }

                    console.log('Retorno do servico de cartoes: %j', retorno);
                    res.send(retorno);
                });

            } else {
                pagamentoDao.salva(pagamento, function (exception, result) {
                    console.log('pagamento criado: ' + result);
                    if (exception) {
                        console.log(exception);
                        res.status(500).send(exception);
                    }

                    // pagamento.id = result.rows[0];
                    // console.log(result.rows[0]);
                    // res.location('/pagamentos/pagamento/' + pagamento.id);

                    res.status(201).json(pagamento);
                });
            }

        });

    app.put('/pagamentos/pagamento/:id', function (req, res) {
        let pagamento = {};
        let id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        console.log(pagamento);

        let pool = app.persistencia.connectionFactory();
        let pagamentoDAO = new app.persistencia.PagamentoDAO(pool);

        pagamentoDAO.atualiza(pagamento, function (error) {
            if (error) {
                res.status(500).send(error);
                return;
            }

            console.log('pagamento atualizado');

            res.send(pagamento);
        });
    });

    app.delete('/pagamentos/pagamento/:id', function (req, res) {
        let pagamento = {};
        let id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        let pool = app.persistencia.connectionFactory();
        let pagamentoDAO = new app.persistencia.PagamentoDAO(pool);

        pagamentoDAO.atualiza(pagamento, function (error) {
            if (error) {
                res.status(500).send(error);
                return;
            }

            console.log('pagamento atualizado');

            res.status(204).send(pagamento);
        });
    });
}