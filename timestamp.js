var express = require("express")
var app = express()
var path = require('path')

function getMonth(m){
   var mA=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   return mA[m]
}

function evalString(s){
    s=Date.parse(s)
    if (!s){
        s={"unix": null, "natural": null}
    } else if(!isNaN(s)) {
        var nDate=new Date(s)
        var natural=getMonth(nDate.getMonth())+' '+nDate.getDate()+', '+nDate.getFullYear()
        s={"unix": s, "natural": natural}
    }
    return s
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/info.html'));
});

app.get('/*', function (req, res) {
  var urlString=evalString(req.url)
  res.type('application/json'); 
  res.json(urlString)
});

app.listen(process.env.PORT || 5000)
