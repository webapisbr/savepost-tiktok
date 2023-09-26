const express = require('express');
const router = express.Router();

router.get('', async function(req, res){
    if(req.query.url){
        try {
            const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
            TiktokDL(req.query.url).then((result) => {
                if(result.status=='success'){
                    let video = result.result.video.map(el => {
                        return {
                            name: 'original',
                            url: el,
                            size: null,
                            format: 'mp4',
                            codec: null,
                            audio: true,
                            width: null,
                            height: null,
                        };
                    });
                    let music = result.result.music.map(el => {
                        return {
                            name: null,
                            url: el,
                            size: null,
                            format: 'mp3',
                            codec: null
                        };
                    });
                    let static = result.result.cover.map(el => {
                        return {
                            name: null,
                            url: el,
                            size: null,
                            format: 'webp',
                            width: null,
                            height: null,
                        };
                    });
                    let dynamic = result.result.dynamic_cover.map(el => {
                        return {
                            name: null,
                            url: el,
                            size: null,
                            format: 'webp',
                            width: null,
                            height: null,
                        };
                    });
                    const data = {
                        profile: {
                            id: result.result.author.uid,
                            url: `https://www.tiktok.com/@${result.result.author.username}`,
                            name: result.result.author.nickname,
                            username: result.result.author.username,
                            signature: result.result.author.signature,
                            region: result.result.author.region,
                            subscriber: null,
                        },
                        stats: {
                            view: parseInt(result.result.statistics.playCount),
                            download: parseInt(result.result.statistics.downloadCount),
                            share: parseInt(result.result.statistics.shareCount),
                            comment: parseInt(result.result.statistics.commentCount),
                            like: parseInt(result.result.statistics.likeCount),
                            dislike: null,
                            favorite: parseInt(result.result.statistics.favoriteCount),
                        },
                        info: {
                            id: result.result.id,
                            type: result.result.type,
                            url: req.query.url.split('?')[0],
                            category: null,
                            date: new Date(result.result.createTime*1000),
                            title: result.result.description,
                            description: null,
                            duration: null,
                        },
                        video: video,
                        audio: [],
                        music: music,
                        cover: {
                            static: static,
                            dynamic: dynamic,
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