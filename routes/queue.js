const express = require("express");
const router = express.Router();

router.post("/", neueNachricht);
router.get("/", holeNachricht);

let queue = [];

function neueNachricht(req, res){
    queue.push(req.body.msg);
    res.status(200).end();
}

function holeNachricht(req, res){
    if(queue.length == 0){
        res.json({empty:true});
    }
    else{
        let msg = queue.shift();
        res.json({"msg":msg});
    }
}

module.exports=router;