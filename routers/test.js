const express = require("express");
const MyModuls=require("./../modules")

var router = express.Router();

router.get("/",async (req,res)=>{

    var x=await abcd();
    

    res.send(x);
    res.end();
    
});


async function abcd(){
    var x=null;
    await MyModuls.DB.test_db.createDocument("debasis-s26",(err,result)=>{
        //res.send(result);
        //res.end();

        x=result;
        //return x;
    });  
    return x;  
}


module.exports = router;//