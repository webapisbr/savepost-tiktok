const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/tiktok', require('./routes/tiktok'));
app.use('/instagram', require('./routes/instagram'));
app.use('/youtube', require('./routes/youtube'));
//app.use('/facebook', require('./routes/facebook'));
//app.use('/twitter', require('./routes/twitter'));*/

app.use(function(req, res, next) {
    res.status(404).json({status: 'invalid', message: 'Rota inválida', result: null});
});

app.listen(3000, () => console.log(`Listening to port 3000`));

exports.handler = app;