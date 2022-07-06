const {
    contas,
    banco
} = require('./bancodedados');

const validarSenhaBanco = (req, res, next) => {
    const {
        senha_banco
    } = req.query;

    if (!senha_banco) {
        return res.status(404).json({
            mensagem: "A senha não foi informada"
        });
    };

    if (senha_banco !== banco.senha) {
        return res.status(404).json({
            mensagem: "A senha do banco informada é inválida!"
        })
    };

    next();
};


const validarSenhaUsuario = (req, res, next) => {
    const {
        senha
    } = req.query;

    if (!senha) {
        return res.status(404).json({
            mensagem: "A senha não foi informada"
        });
    };

    if (senha !== 123) {
        return res.status(404).json({
            mensagem: "A senha do banco informada é inválida!"
        })
    };

    next();
};


const validarNumeroConta = (req, res, next) => {
    const {
        numero_conta
    } = req.query;

    if (!numero_conta) {
        return res.status(404).json({
            mensagem: "O número da conta não foi informado"
        });
    };

    if (numero_conta !== 123) {
        return res.status(404).json({
            mensagem: "Conta bancária não encontada!"
        })
    };

    next();
};

module.exports = {
    validarSenhaBanco,
    validarSenhaUsuario,
    validarNumeroConta
}