const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

var app = express();


app.use(bodyParser.json());

app.listen(3001, () => {
    console.log('servidor rodando na porta 3001');
});

app.post('/cartoes/autoriza',
    check("numero", "Número é obrigatório e deve ter 16 caracteres.").not().isEmpty().isLength(16),
    check("bandeira", "Bandeira do cartão é obrigatória.").not().isEmpty(),
    check("ano_de_expiracao", "Ano de expiração é obrigatório e deve ter 4 caracteres.").not().isEmpty().isLength(4),
    check("mes_de_expiracao", "Mês de expiração é obrigatório e deve ter 2 caracteres").not().isEmpty().isLength(2),
    check("cvv", "CVV é obrigatório e deve ter 3 caracteres").not().isEmpty().isLength(3),
    (req, res) => {
        console.log('processamento pagamento do cartão');

        let cartao = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Erros de validação encontrados');
            res.status(400).send(errors.array());
            return;
        }

        cartao.status = 'AUTORIZADO';
        let response = {
            dados_do_cartao: cartao
        };

        res.status(201).json(response);
    }
);