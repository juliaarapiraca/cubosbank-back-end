const {
    contas
} = require('./bancodedados');

const validarContaParams = (req, res, next) => {

    const {
        numeroConta
    } = req.params;

    const contaUsuario = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!contaUsuario) {
        return res.status(404).json({
            mensagem: 'Conta bancaria não encontrada!'
        });
    };

    next();
};

module.exports = validarContaParams;