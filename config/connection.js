const mongoClient =require("mongodb").MongoClient
require('dotenv').config()


const state = {
    db:null

}

module.exports.connect=function(done){
     const url =process.env.MONGODB_URI || 'mongodb://localhost:27017'
     const dbName=process.env.MONGODB_NAME  || 'BrototypeDB'
     mongoClient.connect(url,(err,data)=>{
        if(err){
            console.log("err",err);
            return done(err);
        } 

        if(data){
        }
        state.db=data.db(dbName)
        done()
     })
}

module.exports.get= function(){
    return state.db
}