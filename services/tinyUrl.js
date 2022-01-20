import mycon from "../models/connection.js";
import crypto from 'crypto';

// TODO use classes and typescript
async function createTinyUrl(obj){
	let uniqueCode = "";
	try {
		// TODO find a way to make it more shorter
		uniqueCode = crypto.createHmac('md5', 'a secret').update(obj.longUrl).digest('hex');
	}
	catch(e) {
		// TODO log the error
		console.log(e.toString())
		return false;
	}
	let data = {
		long_url: obj.longUrl,
		unique_code: uniqueCode,
	}
	let result = await mycon.main("CREATE", data)
	if( ! result) return false;
	return {tinyUrl: obj.baseUrl + "/" + uniqueCode};
}

async function getTinyUrl(uniqueCode){
	let result = await mycon.main("READ", {unique_code: uniqueCode})
	return (result) ? result : false;
}
export default {
	createTinyUrl,
	getTinyUrl
}