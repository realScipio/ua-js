const mongodb = require('mongodb'),
	d=0.85;
var account='',
	iteration=0,
	TOTAL_ITERATIONS=30;

computeUA();

async function computeUA() {
    const db = await mongodb.MongoClient.connect('mongodb://localhost:27017/uaJS');

    await db.collection('uaDB').drop();
	await db.collection('uaDB_1').drop();


    var cursor=db.collection("testDB").find({},{id:1,name:1});
    while(await cursor.hasNext()) {
        const doc = await cursor.next();
        account=doc;
        account.ua=1;
        await db.collection('uaDB').insertOne(account);
        await db.collection('uaDB_1').insertOne(account);

        console.log(doc.id);
    }
    console.log('Initialization done');

    for(iteration=0;iteration<TOTAL_ITERATIONS;iteration++) {
    	console.log('-------------');
        console.log('Iteration: ',iteration+1);
        console.log('-------------\n');

        await db.collection("uaDB_1").drop();
        await db.collection("uaDB").rename('uaDB_1');
        cursor = db.collection('uaDB_1').find({}).sort({id:1});
        while (await cursor.hasNext())
        {
            account = await cursor.next();
            var query = await db.collection("testDB").findOne({id: account.id}, {followers: 1});
            const followers = query.followers;
            var ua = 0;
            for (let follower of followers) {
                query = await
                db.collection("uaDB_1").findOne({name: follower.name}, {ua: 1});
                const ua_1 = query.ua;
                query = await
                db.collection("testDB").findOne({name: follower.name}, {following_count: 1});
                const following = query.following_count;
                ua += ua_1 / following;
            }
            ;
            ua = (1 - d) + d * ua;
            console.log(account.name,ua);
            account.ua = ua;
            await db.collection('uaDB').insertOne(account);
        }
    }
}
