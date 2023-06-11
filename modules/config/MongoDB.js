const mongoos=require('mongoose');
var MongoClient = require('mongodb').MongoClient;

function conString(){
  try{
    var auth_source="admin"
    if(process.app.MongoDB.auth_source){
      auth_source=process.app.MongoDB.auth_source;
    }
    var constr="mongodb://"+process.app.MongoDB.user_name+":"+process.app.MongoDB.password+"@"+process.app.MongoDB.host+":"+process.app.MongoDB.port+"/"+process.app.MongoDB.database+"?authSource="+auth_source;
    return constr;
  }catch{
    return null;
  }
};

module.exports.insertOne=async function(model_schema,document,callback){
  await mongoos.connect(conString()).then(async () => {
    const doc=new model_schema(document);
    await doc.save().then(result=>{
      if(result && result._doc){
        if(typeof(callback)=="function"){
          return callback(null,result._doc);
        }
        //return "ff";
      }
      else{
        if(typeof(callback)=="function"){
          callback(null,null);
        }
        return null;
      }
    }).catch(err=>{
      if(typeof(callback)=="function"){
        callback(err,null);
      }
      return null;
    });
  }).then(result=>{
    // if(result && result._doc){
    //   if(typeof(callback)=="function"){
    //     callback(null,result._doc);
    //   }
    //   return result._doc;
    // }
    // else{
    //   if(typeof(callback)=="function"){
    //     callback(null,null);
    //   }
    //   return null;
    // }
  }).catch(err=>{
    if(typeof(callback)=="function"){
      callback(err,null);
    }
    return null;
  });
};
module.exports.updateOne=async function(model_schema,filter,update,projection,callback){
  await mongoos.connect(conString()).then(()=>{
    var options={
      new: true
    };
    if(projection && Object.keys(projection).length>0){
      options["projection"]=projection;
    }
    model_schema.findOneAndUpdate(filter,update,options).then((doc)=>{
      if(doc && doc._doc){
        if(typeof(callback)=="function"){
          callback(null,doc._doc);
        }
        return doc._doc;
      }
      else{
        if(typeof(callback)=="function"){
          callback(null,null);
        }
        return null;
      }
    }).catch((err)=>{
      if(typeof(callback)=="function"){
        callback(err,null);
      }
      return null;
    });
  }).catch((err)=>{
    if(typeof(callback)=="function"){
      callback(err,null);
    }
    return null;
  });
};
module.exports.upsertOne=async function(model_schema,filter,update,projection,callback){
  await mongoos.connect(conString()).then(()=>{
    var options={
      new: true,
      upsert:true
    };
    if(projection && Object.keys(projection).length>0){
      options["projection"]=projection;
    }
    model_schema.findOneAndUpdate(filter,update,options).then((doc)=>{
      if(doc && doc._doc){        
        if(typeof(callback)=="function"){
          callback(null,doc._doc);
        }
        return doc._doc;
      }
      else{
        if(typeof(callback)=="function"){
          callback(null,null);
        }
        return null;
      }
    }).catch((err)=>{
      if(typeof(callback)=="function"){
        callback(err,null);
      }
      return null;
    });
  }).catch((err)=>{
    if(typeof(callback)=="function"){
      callback(err,null);
    }
    return null;
  });
};

module.exports.findOne=async function(model_schema,filter,projection,callback){
  await mongoos.connect(conString()).then(()=>{
    model_schema.findOne(filter,projection).then((doc)=>{
      if(doc && doc._doc){        
        if(typeof(callback)=="function"){
          callback(null,doc._doc);
        }
        return doc._doc;
      }
      else{
        if(typeof(callback)=="function"){
          callback(null,null);
        }
        return null;
      }
    }).catch((err)=>{
      if(typeof(callback)=="function"){
        callback(err,null);
      }
      return null;
    });
  }).catch((err)=>{
    if(typeof(callback)=="function"){
      callback(err,null);
    }
    return null;
  });
};

module.exports.deleteOne=async function(model_schema,filter,callback){
  await mongoos.connect(conString()).then(()=>{
    model_schema.deleteOne(filter).then((result)=>{
      if(result.acknowledged && result.deletedCount>0){
        if(typeof(callback)=="function"){
          callback(null,result);
        }
        return result;
      }
      else{
        if(typeof(callback)=="function"){
          callback(null,null);
        }
        return null;
      }
    }).catch((err)=>{
      if(typeof(callback)=="function"){
        callback(err,null);
      }
      return null;
    });
  }).catch((err)=>{
    if(typeof(callback)=="function"){
      callback(err,null);
    }
    return null;
  });
};
module.exports.executeAggregation=async function(model_schema,pipeline_query,callback){
  await mongoos.connect(conString()).then(()=>{
    model_schema.aggregate(pipeline_query).then((doc)=>{
      if(doc && doc.length>0){
        if(typeof(callback)=="function"){
          callback(null,doc);
        }
        return null;
      }
      else{
        if(typeof(callback)=="function"){
          callback(null,null);
        }
        return null;
      }
    }).catch((err)=>{
      if(typeof(callback)=="function"){
        callback(err,null);
      }
      return null;
    });
  }).catch((err)=>{
    if(typeof(callback)=="function"){
      callback(err,null);
    }
    return null;
  });
};