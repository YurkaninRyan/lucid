var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    lucid = express();

lucid.set('port', process.env.PORT);

lucid.use(express.static('lucid'));

lucid.use(bodyParser());

lucid.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'lucid', 'dist', 'pages', 'index.html'));
});

lucid.get('/essayresponse', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'lucid', 'dist', 'pages', 'essayresponse.html'));
});

lucid.get('/admin', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'lucid', 'dist', 'pages', 'troll.html'));
});

lucid.get('/*', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'lucid', 'dist', 'pages', '404.html'));
});

lucid.post('/essayresponse', function(req, res) {
    var essay = req.body.essay;
    var txt = essay.split(" ");
    var arraylen = txt.length;
    var log = false;
    var syn;
    for(i = 0; i<arraylen; i++){
        if(txt[i] == "very" || txt[i] == "Very"){
            txt[i] = "";
            log = true;
        }
        else if(log == true){
            syn = thesaurus.find(txt[i]);
            txt[i] = syn[i%5];
            log = false;
        }if(txt[i] == "get"){
            syn = thesaurus.find("get");
            txt[i] = syn[i%5];
        }
    }
    console.log(txt);
    var last = '';
    for(j=0; j<arraylen; j++){
        if(txt[j] != ""){
            last += txt[j] + ' ';
        }
    }
    console.log(last);
    console.log("This essay is " + arraylen +" words long");
});



lucid.listen(lucid.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', lucid.get('port'), lucid.get('env'));
});

var thesaurus = require("thesaurus");
var updated_thesaurus = thesaurus.load("./th_en_US_new.dat");
