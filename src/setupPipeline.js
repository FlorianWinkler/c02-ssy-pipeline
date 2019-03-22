const Request = require('request');


function setup() {
    //Setup Directories
    Request.post({
        url: "http://127.0.0.1:3000/directory/queue",
        json: {value: "http://127.0.0.1:3000/queue"}
    });
    Request.post({
        url: "http://127.0.0.1:3000/directory/pub",
        json: {value: "http://127.0.0.1:3000/pubsub/pub"}
    });
    Request.post({
        url: "http://127.0.0.1:3000/directory/bytes",
        json: {value: "http://127.0.0.1:3000/bytes"}
    });
    Request.post({
        url: "http://127.0.0.1:3000/directory/hosts",
        json: {value: "http://127.0.0.1:3000/hosts"}
    });

    //Subscribe
    Request.post({
        url: "http://127.0.0.1:3000/pubsub/sub",
        json: {
            url:"http://127.0.0.1:3000/bytes"
        }
    });
    Request.post({
        url: "http://127.0.0.1:3000/pubsub/sub",
        json: {
            url:"http://127.0.0.1:3000/hosts"
        }
    });
    //Configure Broker
    Request.put({
        url: 'http://127.0.0.1:3000/broker/configure',
        json:[
            {key: 'queueService', value: 'queue'},
            {key: 'pubService', value: 'pub'}
        ]
    });


}

module.exports = setup;
