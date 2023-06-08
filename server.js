var express = require("express");
const bodyParser = require('body-parser');
process["app"]=require("./process.app.json");

var x=require("ireppo");

var app = express();
app.use(bodyParser.json());
const bdprsr = bodyParser.urlencoded({ extended: false });
app.use((req, res, next) => {
    res.set('X-Powered-By', 'Node JS');
    res.removeHeader("Date"); 
    next();
});
app.use(process.app.root,require("./routers"));
app.use("/",(req,res)=>{
    var html=`<h1>Access denied</h1>`;
    res.send(html);
    res.end();
});
const port = process.env.PORT || 82;
app.listen(port , () => {
    console.log('App listening on port ' + port);    
});