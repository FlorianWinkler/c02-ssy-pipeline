const express = require('express');
const router = express.Router();
const Request = require('request');

let mappings = [];

router.post('/:key',function(req,res){
    mappings[req.params.key]=req.body.value;
    res.status(200).end();
});

router.get('/:key',function(req,res){
    let dir = mappings[req.params.key];
    res.json(dir);
});


module.exports=router;
