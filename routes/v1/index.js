import express from 'express';
import tinyUrl from "../../services/tinyUrl.js";
const router = express.Router();

router.post('/api/v1/createTinyUrl', async function(req, res, next) {
	let obj = req.body
	// TODO handle the query params
	if(obj.longUrl == "" || obj.baseUrl == "") {
		return res.status(400).send({msg: 'Invalid input(s)!'})
	}
	try {
		let resoonse = await tinyUrl.createTinyUrl(obj);
		if(resoonse) {
			obj.tinyUrl = resoonse.tinyUrl
			return res.status(200).json({code: 200, msg: 'Tiny Url created!', payload: obj})
		}
		res.status(400).send({msg: 'Failed to create!'})
	} catch (err) {
		console.error(`Something went wrong! `, err.message);
		next(err);
	}
});

router.get('/*', async function(req, res, next) {
	let tinyUrlStr = req.url
	if( ! tinyUrlStr) {  // TODO add some more validation to validate URL's
		res.status(400).send({msg: 'Invalid url!'})
	}
	if(tinyUrlStr == "/favicon.ico") { // handle favicon issue
		return res.status(200);
	}
	try {
		// TODO handle the query params
		const uniqueCode = tinyUrlStr.substring(1)
		let result = await tinyUrl.getTinyUrl(uniqueCode);
		if(result) {
			// redirecting...
			return res.writeHead(301, {Location: result.long_url}).end();
		}
		return res.status(400).send({msg: 'Failed to get!'})
	} catch (err) {
		console.error(`Something went wrong! `, err.message);
		next(err);
	}
});
export default router;