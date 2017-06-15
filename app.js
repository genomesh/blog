'use strict'

const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const logins = [
    ['DavPop','xf64t'],
    ['Techlord','tl2488'],
    ['Weebse','IAmAWeeb'],
    ['General','P4ssword']
];

const images = [
    ['img/png','/Resources/Amir.png',"Love that"],
    ['img/png','/Resources/Logo.png',"League Logo"],
    ['img/jpg','/Resources/Sexy.jpg',"Sexy Amir"]
];

app.use(bodyParser.json());

let hits = 0;

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname,'public')));

app.post('/feedback', function (req, res) {
    let myFeedback = req.body;
    console.log(myFeedback.name + " submitted some feedback!");
    fs.appendFile(path.join(__dirname,'public/feedback.txt'), JSON.stringify(myFeedback) + "\n" , (err) => {
        if (err) throw err;
    });
})

app.post('/imagesRequest', function (req, res) {
    let loginObj1 = req.body;
    console.log(loginObj1);
    let usr1 = loginObj1.User;
    let psw1 = loginObj1.Password;
    let img = images[loginObj1.img];
    for (let c=0;c<logins.length;c++){
        if(usr1 === logins[c][0]) {
            if(psw1 === logins[c][1]) {
                res.setHeader('Content-Type', img[0]);
                res.sendFile(img[1], {root:__dirname});
                return;
            }
        }
    }
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
