const express = require("express");
const router = express.Router();

router.post("/", neuerEintrag);
router.get("/", holeByteZaehler);

let bytes = 0;

function neuerEintrag(req,res){
    bytes += req.body.msg.bytes;
    res.status(200).end();
}

function holeByteZaehler(req,res){
    res.json({totalBytes:bytes});
}


module.exports=router;