const express = require('express');
const router = express.Router();

router.get('', async function(req, res){
    if(req.query.url){
        try {
            const ytdl = require('ytdl-core');
            ytdl.getInfo(req.query.url).then((result) => {
                let video = result.formats.map(el => {
                    if(el.hasVideo){
                        return {
                            name: el.qualityLabel,
                            url: el.url,
                            size: parseInt(el.contentLength),
                            format: el.container,
                            codec: el.videoCodec,
                            audio: el.hasAudio?true:false,
                            width: parseInt(el.width),
                            height: parseInt(el.height),
                        };
                    }
                });
                let audio = result.formats.map(el => {
                    if(!el.hasVideo&&el.hasAudio){
                        return {
                            name: el.audioQuality,
                            url: el.url,
                            size: parseInt(el.contentLength),
                            format: el.container,
                            codec: el.audioCodec,
                        };
                    }
                });
                let static = result.videoDetails.thumbnails.map(el => {
                    return {
                        name: null,
                        url: el.url,
                        size: null,
                        format: 'webp',
                        width: el.width,
                        height: el.height,
                    };
                });
                const data = {
                    profile: {
                        id: result.videoDetails.author.id,
                        url: result.videoDetails.ownerProfileUrl?result.videoDetails.ownerProfileUrl:result.videoDetails.author.channel_url,
                        name: result.videoDetails.author.name,
                        username: result.videoDetails.author.user,
                        signature: null,
                        region: null,
                        subscriber: parseInt(result.videoDetails.author.subscriber_count),
                        cover: result.videoDetails.author.thumbnails[result.videoDetails.author.thumbnails.length-1].url,
                    },
                    stats: {
                        view: parseInt(result.videoDetails.viewCount),
                        download: null,
                        share: null,
                        comment: null,
                        like: null,
                        dislike: null,
                        favorite: null,
                    },
                    info: {
                        id: result.videoDetails.videoId,
                        type: req.query.url.indexOf('/shorts/')!=-1||result.videoDetails.title.indexOf('#shorts')!=-1||result.videoDetails.description.indexOf('#shorts')!=-1?'shorts':'video',
                        url: result.videoDetails.video_url,
                        category: result.videoDetails.category,
                        date: result.videoDetails.publishDate,
                        title: result.videoDetails.title,
                        description: result.videoDetails.description,
                        duration: parseInt(result.videoDetails.lengthSeconds),
                    },
                    video: video.filter(n => n),
                    audio: audio.filter(n => n),
                    music: [],
                    cover: {
                        static: static,
                        dynamic: [],
                    },
                };
                res.status(200).json({status: 'success', message: null, result: data});
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