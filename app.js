const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', async function(req, res){
    res.status(400).json({message: 'Falha na requisição', status: 'failed'});
});

app.use(function(req, res) {
    res.status(404).json({message: 'Rota inválida', status: 'invalid'});
});

app.listen(3000, () => console.log(`Listening to port 3000`));