import mycon from "../models/connection.js";

async function createUser(userData){
	let data = {
		email: userData.email,
		password: userData.password,
		first_name: userData.firstName,
		last_name: userData.lastName,
		dob: userData.dob,
		gender: userData.gender
	}

	let result = await mycon.main("CREATE", data)
	return (result) ? true : false;
}

async function login(userData){
	let data = {
		email: userData.email,
		password: userData.password
	}
	let result = await mycon.main("READ", data)
	return (result) ? result : false;
}
export default {
	login,
	createUser
}