const { check, validationResult } = require('express-validator');

module.exports = (app) => {
    app.get('/pagamentos', (req, res) => {
        res.send('ok');
    });

    app.post('/pagamentos/pagamento',
        check('forma_de_pagamento', 'Forma de pagamento é obrigatória.').not().isEmpty(),
        check('valor', 'Valor é obrigatório e deve ser um decimal.').not().isEmpty(),
        check('moeda', 'Moeda é obrigatória e deve ter 3 caracteres.').not().isEmpty(),

        (req, res) => {
            let pagamento = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('Erros de validação encontrados');
                res.status(400).send(errors.array());
                return;
            }

            console.log('processando pagamento');

            let pool = app.persistencia.connectionFactory();
            let pagamentoDao = new app.persistencia.PagamentoDAO(pool);

            pagamento.status = 'CRIADO';
            pagamento.data = new Date;

            pagamentoDao.salva(pagamento, (exception, result) => {
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
        });

    app.put('/pagamentos/pagamento/:id', (req, res) => {
        let pagamento = {};
        let id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        console.log(pagamento);

        let pool = app.persistencia.connectionFactory();
        let pagamentoDAO = new app.persistencia.PagamentoDAO(pool);

        pagamentoDAO.atualiza(pagamento, (error) => {
            if (error) {
                res.status(500).send(error);
                return;
            }

            console.log('pagamento atualizado');

            res.send(pagamento);
        });
    });

    app.delete('/pagamentos/pagamento/:id', (req, res) => {
        let pagamento = {};
        let id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        let pool = app.persistencia.connectionFactory();
        let pagamentoDAO = new app.persistencia.PagamentoDAO(pool);

        pagamentoDAO.atualiza(pagamento, (error) => {
            if (error) {
                res.status(500).send(error);
                return;
            }

            console.log('pagamento atualizado');

            res.status(204).send(pagamento);
        });
    });
}