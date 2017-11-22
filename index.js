// Retrieve
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb'),
  Server = mongo.Server;
  
// Connect to the db
MongoClient.connect("mongodb://steemit:steemit@mongo1.steemdata.com:27017/SteemData", function(err, db) {
  if(!err) {
	  
		 var start= new Date();
		var collection=db.collection("Accounts"),
		i=0;
		var batch=[];
		collection.find({},{name:1,followers:1,"_id":0,id:1}).forEach(function(doc) {
			batch.push(doc);
			if(i!=0&&i%1000==0)
			{
				copyToDb(i,batch);
				batch=[];
			}
				
			i++;
			
			
}, function(err) {
	copyToDb(i,batch);
  console.log(err,'error');
  console.log(start,new Date());
});

function copyToDb(j,copyBatch){
	MongoClient.connect("mongodb://localhost:27017/uaJS",function(err, db) {
  if(!err) {
		db.collection("followDB").insertMany(copyBatch).then(function(result){console.log(j); db.close();});
	  
  }
});
}
	      

	  
  }
});