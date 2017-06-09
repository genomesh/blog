'use strict'

const express  = require('express');
const app = express();
const bodyParser = require('body-parser');

let myMessages = [];

const logins = [
    ['DavPop','xf64t'],
    ['Techlord','tl2488'],
    ['Mibkins','MK12'],
    ['Zupkins','ZK12']
];

const images = [
    ['img/png','/Resources/Amir.png',"Love that"],
    ['img/png','/Resources/Logo.png',"League Logo"],
    ['img/jpg','/Resources/Sexy.jpg',"Sexy Amir"]
];

app.use(bodyParser.json());

let hits = 0;

app.set('port', (process.env.PORT || 3000));

app.use(express.static('public', {root:__dirname}));

app.post('/feedback', function (req, res) {
    let myFeedback = req.body;
    console.log(myFeedback);
    myMessages.push(myFeedback);
})

app.post('/imagesRequest', function (req, res) {
    let numobj = req.body
    res.setHeader('Content-Type', images[numobj.img][0]);
    res.sendFile(images[numobj.img][1], {root:__dirname});
})

app.post('/login', function (req, res) {
    let loginObj = req.body;
    let usr = loginObj.User;
    let psw = loginObj.Password;
    for (let c=0;c<logins.length;c++){
        if(usr === logins[c][0]) {
            if(psw === logins[c][1]) {
                res.setHeader('Content-Type', 'application/json');
                let imgTitles = [];
                for (let t=0;t<images.length;t++){
                    imgTitles.push(images[t][2])
                }
                res.json(imgTitles);
                return;
            }
        }
    }
})

app.get('/hits', function (req, res) {
    hits += 1;
    res.setHeader('Content-Type', 'application/json');
    res.json({"hits":hits});
})

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port'))
})
