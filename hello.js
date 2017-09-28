var http = require('http');


//create a server object:
http.createServer(function (req, res) {
    res.write('Hello World! this is peter test! thank you OGC '); //write a response to the client
    //console.log(req);


    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

