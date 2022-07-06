const {
    append
} = require('express/lib/response');
let {
    contas,
    saques,
    depositos,
    transferencias
} = require('../bancodedados');
const {
    validarNumeroConta
} = require('../intermediariosQuery');
let numero = 1;


const listarContas = (req, res) => {
    return res.json(contas);
};


const novaConta = (req, res) => {
    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    const conta = {
        numero: numero++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        },
    };

    contas.push(conta);

    return res.status(201).json(conta);
};


const atualizarConta = (req, res) => {
    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    const {
        numeroConta
    } = req.params;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(204).send();
};


const deletarConta = (req, res) => {
    const {
        numeroConta
    } = req.params;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (conta.saldo !== 0) {
        return res.status(404).json({
            mensagem: 'A conta só pode ser removida se o saldo for zero!'
        });
    };

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta)
    });

    return res.status(204).send();
};

module.exports = {
    listarContas,
    novaConta,
    atualizarConta,
    deletarConta,
}