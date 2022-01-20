import mongodb from 'mongodb';
const {MongoClient} = mongodb;
async function main(method, dataObject) {
	const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
	const client = new MongoClient(uri);
	try {
		await client.connect();
		switch(method) {
			case("READ"): {
				return await findOne(client, dataObject)
			}
			case("CREATE"): {
				return await createOne(client, dataObject)
			}
			default: {
				return false;
			}
		}
	} catch (e) {
		console.error(e);
		return false
	}
	finally {
		await client.close();
	}
}

async function createOne(client, data){
    let res = await client.db("vla").collection("users").insertOne(data);
    return (res.insertedId) ? res.insertedId : false
}
async function findOne(client, data) {
    const result = await client.db("vla").collection("users").findOne({ email: data.email, password: data.password });
    return (result) ? result : false;
}
export default {
	main
}