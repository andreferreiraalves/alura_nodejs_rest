module.exports = function (app) {
    app.post('/correios/calcula-prazo', function (req, res) {
        let dadosDaEntrada = req.body;

        let correiosSOAPClient = new app.servicos.correiosSOAPClient();

        correiosSOAPClient.calculaPrazo(dadosDaEntrada, function (error, resultado) {
            if (error) {
                res.status(500).send(error);
                return;
            }

            console.log('prazo calculado');

            res.json(resultado);
        });
    });
}