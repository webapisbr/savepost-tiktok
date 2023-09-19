const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', async function(req, res, next){
    const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
    TiktokDL(req.url.replace('/?url=','')).then((result) => {
        console.log(result)
        res.status(200).json(result);
    }).catch(() => {
        res.status(400).json({message: 'Falha na requisição', status: 'failed'});
    });
});

app.use(function(req, res, next) {
    res.status(404).json({message: 'Rota inválida', status: 'invalid'});
});

app.listen(port, () => console.log(`Listening to port ${post}`));