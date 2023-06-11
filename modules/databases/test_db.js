const mongoos=require('mongoose');
const MongoDB=require("./../config/MongoDB");

const schema=new mongoos.Schema({
    _id:String,
    user_name:String,
    details:{
        first_name:{type: String, default:null},
        last_name:{type: String, default:null},
        gender:{type: String, default:null},
        photo:{type: String, default:null},
    }
});
const collection=mongoos.model('test_db',schema);

module.exports.createDocument=async function(user_name,callback){    
    var doc={
        "_id":"4"+user_name,
        "user_name":user_name
    };
    return await MongoDB.insertOne(collection,doc,callback);
    
};
