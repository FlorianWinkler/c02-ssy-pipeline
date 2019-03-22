const Request = require("request");
const express = require('express');
const router = express.Router();


let config = {};


//polling();

function polling(){
    if(config.run===true) {
        Request.get({
            url: config.queueService,
            json: true
        }, handleResponse);

        setTimeout(polling, 100);
    }
}

function handleResponse(err, res, body){
    if(body.empty === true){
        console.log("queue empty");
    }
    else {
        Request.post({
            url: config.pubService,
            json: {msg: body.msg}
        });
    }
}

router.put('/configure',function(req,res){
    let i=0;
    if(req.body[i] !== undefined){
        Request.get({
            url: 'http://127.0.0.1:3000/directory/'+req.body[i].value,
            json: true
        }, handleDirectoryResponse);
    }
    function handleDirectoryResponse (error, response, body) {
        config[req.body[i++].key]=body;
        if(req.body[i] !== undefined) {
            Request.get({
                url: 'http://127.0.0.1:3000/directory/' + req.body[i].value,
                json: true
            }, handleDirectoryResponse);
        }
        else{
            console.log('Broker: Finished loading directories');
            //console.log(config);
        }
    }
    res.status(200).end();
});

router.get('/start',function(req,res){
    config.run=true;
    polling();
    res.status(200).end();
});

router.get('/stop',function(req,res){
    config.run=false;
    res.status(200).end();
});

module.exports=router;
