const express = require('express');
const router = express.Router();

router.get('', async function(req, res){
    if(req.query.url){
        try {
            const instaDL = require("i-downloader");
            instaDL(req.query.url).then((result) => {
                if(result.status==true){
                    let video = result.data.map(el => {
                        return {
                            name: 'original',
                            url: el.url,
                            size: null,
                            format: 'mp4',
                            codec: null,
                            audio: true,
                            width: null,
                            height: null,
                        };
                    });
                    let static = result.data.map(el => {
                        return {
                            name: null,
                            url: el.thumbnail,
                            size: null,
                            format: 'webp',
                            width: null,
                            height: null,
                        };
                    });
                    const data = {
                        profile: {
                            id: null,
                            url: null,
                            name: null,
                            username: null,
                            signature: null,
                            region: null,
                            subscriber: null,
                        },
                        stats: {
                            view: null,
                            download: null,
                            share: null,
                            comment: null,
                            like: null,
                            dislike: null,
                            favorite: null,
                        },
                        info: {
                            id: req.query.url.indexOf('/stories/')!=-1?req.query.url.replace('https://','').split('/')[3]:req.query.url.replace('https://','').split('/')[2],
                            type: req.query.url.indexOf('/stories/')!=-1?'stories':req.query.url.indexOf('/reel/')!=-1?'reel':'feed',
                            url: req.query.url.split('?')[0],
                            category: null,
                            date: null,
                            title: null,
                            description: null,
                            duration: null,
                        },
                        video: video,
                        audio: [],
                        music: [],
                        cover: {
                            static: static,
                            dynamic: [],
                        },
                    };
                    res.status(200).json({status: 'success', message: null, result: data});
                }else{
                    res.status(400).json({message: 'Falha na requisição', status: 'failed'});
                }
            }).catch(() => {
                res.status(400).json({status: 'failed', message: 'Falha na requisição', result: null});
            });
        }catch{
            res.status(400).json({status: 'failed', message: 'Falha na requisição', result: null});
        }
    }else{
        res.status(400).json({status: 'invalid', message: 'Atributo inválido', result: null});
    }
});

module.exports = router;