var express = require('express'),
    path = require('path'),
    lucid = express();

lucid.set('port', process.env.PORT);

lucid.use(express.static('lucid'));

lucid.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'lucid', 'dist', 'pages', 'index.html'));
});

lucid.get('/admin', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'lucid', 'dist', 'pages', 'troll.html'));
});

lucid.get('/*', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'lucid', 'dist', 'pages', '404.html'));
});

lucid.listen(lucid.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', lucid.get('port'), lucid.get('env'));
});