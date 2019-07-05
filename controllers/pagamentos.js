module.exports = (app) => {
    app.get('/pagamentos', (req, res) => {
        res.send('ok');
    });

    app.post('/pagamentos/pagamento', (req, res) => {

        let pagamento = req.body;
        // mudou a forma de utilização
        // req.assert("forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
        // req.assert("valor", "Valor é obrigatório e deve ser um decimal.").notEmpty();
        // req.assert("moeda", "Moeda é obrigatória e deve ter 3 caracteres.").notEmpty();

        // var errors = req.validationErrors();

        // if (errors) {
        //     console.log('Erros de validação encontrados');
        //     res.status(400).send(errors);
        //     return;
        // }

        console.log('processando pagamento');

        let pool = app.persistencia.connectionFactory;
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
}