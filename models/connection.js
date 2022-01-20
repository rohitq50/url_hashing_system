import mongodb from 'mongodb';
const {MongoClient} = mongodb;
async function main(method, dataObject) {
	// TODO add uri in a conf file
	const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
	const client = new MongoClient(uri);
	try {
		await client.connect();
		switch(method) {
			// TODO make the below code more reusable
			case("READ"): {
				const result = await client.db("hash_system").collection("url").findOne({ unique_code: dataObject.unique_code });
    			return (result) ? result : false;
			}
			case("CREATE"): {
				let res = await client.db("hash_system").collection("url").updateOne({unique_code: dataObject.unique_code}, {$set: dataObject}, {upsert:true});
   				return (res.upsertedCount || res.matchedCount) ? true : false
			}
			default: {
				return false;
			}
		}
	} catch (e) {
		// TODO log error
		console.error(e);
		return false
	}
	finally {
		await client.close();
	}
}
export default {
	main
}