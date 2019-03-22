const express = require("express");
const router = express.Router();

router.post("/", neuerEintrag);
router.get("/", holeHostZaehler);

let hosts={};

function neuerEintrag(req,res){
    let host = req.body.msg.host;
    if(typeof hosts[host] == "undefined"){
        hosts[host]=1;
    }
    else{
        hosts[host]+=1;
    }
    res.status(200).end();
}

function holeHostZaehler(req,res){
    res.json({count:hosts});
}


module.exports=router;