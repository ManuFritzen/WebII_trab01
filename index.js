const express = require('express');
const app = express();

// 1)
app.get('/', (req, res) => {
    res.send('Seja bem vindo a disciplina de WEB II');
    }
);

// 2)
app.get('/saudacao/:nome', (req, res) => {
    res.send(`Olá, ${req.params.nome}!`);
    }
);

//3)
app.use((req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).send('Não autorizado');
    } else {
        next();
    }
});

// 4)
app.get('/produtos', (req, res) => {
    const { preco, cor } = req.query;
    res.send(`Listando produtos: Preço: ${preco}, Cor: ${cor}`);
    }
);

// 5)

app.use(express.json());
app.post('/produtos', (req, res) => {
    const { body } = req;
    const id = Math.floor(Math.random() * 1000);
    res.send({ id, ...body });
    }
);

//6)

app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) {
        res.status(400).send('Nome e email são obrigatórios');
    } else {
        res.send('Usuário cadastrado com sucesso');
    }
});

//7)
app.use((err, req, res, next) => {
   
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Erro interno no servidor',
      status: err.status || 500
    }
  });
});

app.get('/testeErro', (req, res) => {
    const err = new Error('Recurso não encontrado');
    err.status = 404;
    throw err;
});


//Definindo a porta
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    }
);


