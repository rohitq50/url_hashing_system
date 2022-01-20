import express from 'express';
import userAccount from "../../services/userAccount.js";
const router = express.Router();

router.post('/createUser', async function(req, res, next) {
	let userData = req.body
	if(userData.email == "" || userData.password == "" || userData.first_name == "" || userData.last_name == "" || userData.gender == "" || userData.dob == "") {
		return res.status(400).send({msg: 'Invalid input(s)!'})
	}
	try {
		let success = await userAccount.createUser(userData);
		if(success) {
			return res.status(200).json({code: 200, msg: 'Account created!', payload: userData})
		}
		res.status(400).send({msg: 'Failed to create!'})
	} catch (err) {
		console.error(`Something went wrong! `, err.message);
		next(err);
	}
});

router.get('/login', async function(req, res, next) {
	let userData = req.body
	if(userData.email == "" || userData.password == "") {
		res.status(400).send({msg: 'Invalid input(s)!'})
	}
	try {
		let result = await userAccount.login(userData);
		if(result) {
			res.status(200).json(result)
			return;
		}
		res.status(400).send({msg: 'Failed to create!'})
	} catch (err) {
		console.error(`Something went wrong! `, err.message);
		next(err);
	}
});
export default router;