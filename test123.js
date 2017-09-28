var http = require('http');
var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
const https = require('https');


app.set('view engine','ejs');
app.use(express.static('public'));  // set public = localhost:8080
app.use(bodyParser.urlencoded({ extended: true }));

var data1 = require('./public/json/mydata1.json');  //  ./ 根目錄
var data2 = require('./public/json/test.json');  //  ./ 根目錄


// app.get("/", function(req, res, next){
//   var  = Object.assign(data1, values);
//   res.render('index_home',data1);
// })


// get method
app.get("/getpage", function(req, res, next){
      var values = req.query;
      console.log(values);
      var data_temp = Object.assign(data1, values);
      res.render('index_home',data_temp);
});
app.get("/getpage4", function(req, res, next){
  var values = req.query;
  console.log(values);
  res.render('mypage4',values);
});
app.get("/getpage7", function(req, res, next){
  var values = req.query;
  // console.log(values);
    var temp = fs.readFileSync('./public/json/position.json','utf8')
    var json = JSON.parse(temp);
    console.log(json.position)
    // var obj = {
    //     position: []
    // };
    json.position.push({user_id: values.user_id, 
                       user_lat: values.lat_a,
                       user_lng: values.lng_a});
    // var json = JSON.stringify(obj);
    // var json = obj;
    // console.log(typeof json)
    console.log(json.position)
    var obj=JSON.stringify(json)

    fs.writeFileSync('./public/json/position.json', obj, 'utf8',{'flags':'a+'});
    // fs.appendFileSync('./public/json/position.json', json, 'utf8',{'flags':'a+'});
  res.end();
});


// post method
app.post("/postpage", function(req, res, next){
      var values = req.body;
      console.log(values);
      var data_temp = Object.assign(data1, values);
      res.render('index_home',data_temp);

      // res.render('index',{
      //   headtittle : 'OGCCC',
      //   u2nav1 : [ 'HHHH', 'PPPP', 'EEEE']
      // });

      // res.json({
      //   mysesult : result 
      // });

});





app.get("/index_home", function(req, res, next){
  res.render('index_home',data1);
});

app.get("/mypage1", function(req, res, next){
  res.render('mypage1');
});

app.get("/mypage2", function(req, res, next){
  res.render('mypage2');
});
app.get("/mypage3", function(req, res, next){
  res.render('mypage3');
});
app.get("/mypage4", function(req, res, next){
  res.render('mypage4');
});
app.get("/mypage6", function(req, res, next){
  res.render('mypage6');
});
app.get("/mypage7", function(req, res, next){
  res.render('mypage7');
});
app.get("/mypage8", function(req, res, next){
  res.render('mypage8');
});




// print _ get method 
app.get("/print", function(req, res, next){
  res.send(req.query.fname);
});
app.get("/getjson", function(req, res, next){

  var temp = fs.readFileSync('./public/json/position.json','utf8');
  var json = JSON.parse(temp);
  console.log(json.position)
  var show=JSON.stringify(json)

  res.send(show);
});


// print _ post method 
app.post("/print", function(req, res, next){
  res.send(req.body.fname);
});

app.get("/test", function(req, res, next){
var t
  const options = {
    hostname: 'www.googleapis.com',
    path: '/geolocation/v1/geolocate?key=AIzaSyBUVMPkDskVQlUsdw92-Ygv9qhIB0UOQH4',
    method: 'POST',
    // headers: {'content-type':'application/json'},
    // data:data2
  };
    request = https.request(options, (response) => {
        // console.log('statusCode:',typeof response.statusCode);
        // console.log('headers:', response.headers);
      
        response.on('data', (d) => {
            process.stdout.write(d);
            t = JSON.parse(d)
        });
        response.on('end', (d) => {
          res.send(t)
          // res.render('mypage4',t);
      
          // res.end(); 
                  
        });
        
    });
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();  
});









// app.use(function(req,res,next){
//   // next('sometiong error o.0');
//   var err = next(new Error('sometiong error o.0'));
//   err.code = 519;
//   next(err)
// });

app.get("/me", function(req, res, next){
  return next('something error orz');
  // var b = 12;
  // var result = a + b;

  // a = result;
  // res.send(result.toString());
});

//5系列錯誤
app.use(function(error, req, res, next){ 
  console.log(error);
  res.send('error OGC');
});

// //4系列錯誤
// app.use(function(req, res, next){
//   res.redirect('https://github.com/aaa/bbb');
// });

app.listen(8080);


//create a server object:
// http.createServer(function (req, res) {
// res.write('Hello World! test123 fufufufuqqq\n'); //write a response to the client 
// res.write('Hello World! test123 fufufufuqqq\n');
// res.write('Hello World! test123 fufufufuqqq\n');
// res.write('Hello World! test123 fufufufuqqq\n');

//  res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

