const {
    contas
} = require('./bancodedados');

const validarDados = (req, res, next) => {
    const {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    } = req.body;

    if (!nome) {
        return res.status(400).json({
            mensagem: "O nome é obrigatório"
        });
    };

    if (!cpf) {
        return res.status(400).json({
            mensagem: "O cpf é obrigatório"
        });
    };

    if (!data_nascimento) {
        return res.status(400).json({
            mensagem: "A data de nascimento é obrigatória"
        });
    };

    if (!telefone) {
        return res.status(400).json({
            mensagem: "O telefone é obrigatório"
        });
    };

    if (!email) {
        return res.status(400).json({
            mensagem: "O email é obrigatório"
        });
    };

    if (!senha) {
        return res.status(400).json({
            mensagem: "A senha é obrigatória"
        });
    };

    next();
}


const validarDadosDeposito = (req, res, next) => {
    const {
        numero_conta,
        valor
    } = req.body;

    if (!numero_conta) {
        return res.status(404).json({
            mensagem: "O número da conta é obrigatório!"
        });
    };

    if (!valor) {
        return res.status(404).json({
            mensagem: "O valor é obrigatório!"
        });
    }

    next();
};


const validarDadosSaque = (req, res, next) => {
    const {
        numero_conta,
        valor,
        senha
    } = req.body;

    if (!numero_conta) {
        return res.status(404).json({
            mensagem: "O número da conta é obrigatório!"
        });
    };

    if (!valor) {
        return res.status(404).json({
            mensagem: "O valor é obrigatório!"
        });
    }

    if (!senha) {
        return res.status(404).json({
            mensagem: "A senha é obrigatória!"
        });
    }

    next();
};


const validarDadosTransferencia = (req, res, next) => {
    const {
        numero_conta_origem,
        numero_conta_destino,
        valor,
        senha
    } = req.body;

    if (!numero_conta_origem) {
        return res.status(404).json({
            mensagem: "O número da conta de origem é obrigatório!"
        });
    }

    if (!numero_conta_destino) {
        return res.status(404).json({
            mensagem: "O número da conta de destino é obrigatório!"
        });
    }

    if (!valor) {
        return res.status(404).json({
            mensagem: "O valor é obrigatório!"
        });
    }

    if (!senha) {
        return res.status(404).json({
            mensagem: "A senha é obrigatória!"
        });
    }

    next();
};


const validarConta = (req, res, next) => {
    const {
        numero_conta
    } = req.body;

    const conta = bancodedados.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!conta) {
        return res.status(404).json({
            mensagem: 'Conta bancaria não encontrada!'
        });
    }

    next();
};


const validarSenha = (req, res, next) => {
    const {
        senha
    } = req.body;

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

validarCpf = (req, res, next) => {
    const {
        cpf
    } = req.body;

    const cpfUsuario = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    if (cpfUsuario) {
        return res.status(404).json({
            mensagem: 'CPF ou EMAIL já estão cadastrados!'
        });
    };

    next();
};

validarEmail = (req, res, next) => {
    const {
        email
    } = req.body;

    const emailUsuario = contas.find((conta) => {
        return conta.usuario.email === email;
    });

    if (emailUsuario) {
        return res.status(404).json({
            mensagem: 'CPF ou EMAIL já estão cadastrados!'
        });
    };

    next();
};

validarCpfUsuario = (req, res, next) => {
    const {
        cpf
    } = req.body;

    const cpfUsuario = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    if (cpfUsuario) {
        if (cpfUsuario.numero !== Number(req.params.numeroConta)) {
            return res.status(404).json({
                mensagem: 'CPF ou EMAIL já estão cadastrados!'
            });
        };
    };

    next();
};

validarEmailUsuario = (req, res, next) => {
    const {
        email
    } = req.body;

    const emailUsuario = contas.find((conta) => {
        return conta.usuario.email === email;
    });

    if (emailUsuario) {
        if (emailUsuario.numero !== Number(req.params.numeroConta)) {
            return res.status(404).json({
                mensagem: 'CPF ou EMAIL já estão cadastrados!'
            });
        };
    };
    next();
};

module.exports = {
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
};