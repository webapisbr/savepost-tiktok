const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', async function(req, res){
    const { TiktokDL, TiktokStalk } = require("@tobyg74/tiktok-api-dl");
    TiktokDL(req.url.replace('/?url=','')).then((result) => {
        if(result.status=='success'){
            TiktokStalk(req.url.replace('/?url=','').replace('https://','').replace('http://','').split('/')[1].replace('@','')).then((result2) => {
                if(result2.status=='success'){
                    res.status(200).json({status: 'success', post: result.result, profile: result2.result});
                }else{
                    res.status(400).json({message: 'Falha na requisição', status: 'failed'});
                }
            });
        }else{
            res.status(400).json({message: 'Falha na requisição', status: 'failed'});
        }
    }).catch(() => {
        res.status(400).json({message: 'Falha na requisição', status: 'failed'});
    });
});

app.use(function(req, res) {
    res.status(404).json({message: 'Rota inválida', status: 'invalid'});
});

app.listen(3000, () => console.log(`Listening to port 3000`));