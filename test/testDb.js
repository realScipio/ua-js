var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb'),
	Server = mongo.Server;
	
MongoClient.connect("mongodb://localhost:27017/uaJS",function(err, db) {
	if(!err) {
		db.collection("testDB").drop();
		db.collection("testDB").insertMany([{"id":1,"name":"A","followers":["B","C","D","E","F"],"following_count":2},
			{"id":2,"name":"B","followers":["A"],"following_count":3},
			{"id":3,"name":"C","followers":["A","B"],"following_count":1},
			{"id":4,"name":"D","followers":["B","E"],"following_count":2},
			{"id":5,"name":"E","followers":["D","F"],"following_count":3},
			{"id":6,"name":"F","followers":["E"],"following_count":2}]
			).then(function(result){
                showDB(db);});
	}
});

async function showDB(db){

    const show=await db.collection("testDB").find({});
    console.log(await show.toArray());
    db.close();
}
