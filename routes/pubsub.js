const express = require("express");
const router = express.Router();
const Request = require("request");

let subscriptions = [];

router.post("/pub", publish);
router.post("/sub", subscribe);

function subscribe(req,res){
    let url = req.body.url;
    subscriptions.push(url);
    res.status(200).end();
}

function publish(req,res){
    let msg = req.body.msg;
    for(let url of subscriptions){
        console.log("Publish - URL:"+url);
        Request.post({
            url: url,
            json: {msg: msg}
        });
    }
    res.status(200).end();
}

module.exports = router;