// @ts-nocheck
import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

/* We return those values to the server */
const dbReturn = {
	OK: Symbol(0),
	userAlreadyExists: Symbol(1),
	loginError: Symbol(2),
};

const db = new sqlite3.Database('./data.db')

/* 	Taken from https://cheatcode.co/tutorials/how-to-use-sqlite-with-node-js 
	It makes our queries return a Promise for async
*/
const query = (command, method = 'all') => {
    return new Promise((resolve, reject) => {
        db[method](command, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    }); 
};

/* 	Initialize our database by creating a table if it doesn't exist
	and some test users
*/
async function dbInit() {
	db.serialize(async () => {
		await query("CREATE TABLE IF NOT EXISTS users (username text, hash text, tasks text)", 'run');
		await createTestUsers();
	});
}

/* Try to login */
async function tryLogin(username, password) {
	/* Check if user exists */
	if (!(await checkIfExists(username))) {
		return dbReturn.loginError;
	}

	/* Check if password is correct */
	if (!(await validateUser(username, password))) {
		return dbReturn.loginError;
	}

	return dbReturn.OK;
}

/* Try to create an account */
async function trySignUp(username, password) {
	/* Check if user doesn't already exist */
	if (await checkIfExists(username)) {
		return dbReturn.userAlreadyExists;
	}

	/* Store the user in database */
	await storeUser(username, password);
	return dbReturn.OK;
}

/* Returns a list of tasks of given user */
async function readTasks(username) {
	let usr = await query(`SELECT tasks FROM users WHERE username = "${username}"`);

	/* 	The tasks are stored as a string
		and separated with ";".
	*/
	let task_list = usr[0].tasks.split(";");
	let ret = []

	/* Check if there's no empty tasks */
	task_list.forEach(task => {
		if (task != '') {
			ret.push(task);
		}
	});

	return ret;
}

/* Update user tasklist by overwriting the old one */
async function updateTasks(username, tasks) {
	/* Erase the old tasklist */
	await query(`UPDATE users SET tasks="" WHERE username = "${username}"`);

	/* Add the tasks one by one */
	for (let i = 0; i < tasks.length; i++) {
		const task = tasks[i];
		await addTask(username, task);
	}
}

/* -------------PRIVATE-----------------*/
/* Adds a single task to a user */
async function addTask(username, task) {
	let usr = await query(`SELECT tasks FROM users WHERE username = "${username}"`);
	usr[0].tasks += `;${task};`
	await query(`UPDATE users SET tasks="${usr[0].tasks}" WHERE username = "${username}"`, "run");
}

/* Check if user exists in database */
async function checkIfExists(username) {
	const user = await query(`SELECT * FROM users WHERE username = "${username}"`);
	return (user.length == 1);
}

/*	Stores a new user in our database. 
	Needs to be sure that there's no user with that username.
*/
async function storeUser(username, password) {
	/* Hash the user password before storing it */
	const hash = await hashPassword(password)
	await query(`INSERT INTO users VALUES ("${username}", "${hash}", "")`, 'run');
}

/* 	Checks if password matches the user.
	Needs to be sure that there's a user with that username 
*/
async function validateUser(username, password) {
	const user = await query(`SELECT username, hash FROM users WHERE username = "${username}"`);
	const currentHash = user[0].hash;

	return (await bcrypt.compare(password, currentHash));
}

/* Hash and salt the password. We use bcrypt for that. */
async function hashPassword(password) {
	const hash = await bcrypt.hash(password, 10);
	return hash;
}

/* If database is empty, creates test users */
const createTestUsers = async() => {
	const existingUsers = await query('SELECT * from users');

	if (existingUsers?.length === 0) {
		let usernames = ['TestUsr1', 'TestUsr2', 'TestUsr3'];
		let passwords = ['TestPwd1', 'TestPwd2', 'TestPwd3'];
		for (let i = 0; i < 3; i++) {
			await storeUser(usernames[i], passwords[i]);
		}

		await addTask("TestUsr1", "Pucio henzap");
	}
};

/* Export functions for use in server */
export {dbReturn, dbInit, tryLogin, trySignUp, readTasks, updateTasks};