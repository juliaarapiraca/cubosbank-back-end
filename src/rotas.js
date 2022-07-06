const express = require('express');
const rotas = express();
const contas = require('./controladores/contas');
const transacoes = require('./controladores/transacoes');
const {
    validarSenhaBanco,
    validarSenhaUsuario,
    validarNumeroConta
} = require('./intermediariosQuery');
const {
    validarDados,
    validarDadosDeposito,
    validarDadosSaque,
    validarDadosTransferencia,
    validarConta,
    validarSenha,
    validarCpf,
    validarEmail,
    validarEmailUsuario,
    validarCpfUsuario,
} = require('./intermediariosBody');
const validarContaParams = require('./intermerdiariosParams');


rotas.get('/contas', validarSenhaBanco, contas.listarContas);

rotas.post('/contas', validarDados, validarCpf, validarEmail, contas.novaConta);

rotas.put('/contas/:numeroConta/usuario', validarDados, validarContaParams, validarEmailUsuario, validarCpfUsuario, contas.atualizarConta);

rotas.delete('/contas/:numeroConta', validarContaParams, contas.deletarConta);

module.exports = rotas;