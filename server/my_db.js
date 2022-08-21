import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

const dbReturn = {
	OK: Symbol(0),
	userAlreadyExists: Symbol(1),
	loginError: Symbol(2),
};

const db = new sqlite3.Database('./data.db')
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

async function dbInit() {
	db.serialize(async () => {
		await query("CREATE TABLE IF NOT EXISTS users (username text, hash text, tasks text)", 'run');
		await createTestUsers();
	});
}

async function tryLogin(username, password) {
	if (!(await checkIfExists(username))) {
		return dbReturn.loginError;
	}

	if (!(await validateUser(username, password))) {
		return dbReturn.loginError;
	}

	return dbReturn.OK;
}

async function trySignUp(username, password) {
	if (await checkIfExists(username)) {
		return dbReturn.userAlreadyExists;
	}

	await storeUser(username, password);
	return dbReturn.OK;
}

async function readTasks(username) {
	let usr = await query(`SELECT tasks FROM users WHERE username = "${username}"`);
	let task_list = usr[0].tasks.split(";");
	let ret = []

	task_list.forEach(task => {
		if (task != '') {
			ret.push(task);
		}
	});

	return ret;
}

async function addTask(username, task) {
	let usr = await query(`SELECT tasks FROM users WHERE username = "${username}"`);
	usr[0].tasks += `${task};`
	await query(`UPDATE users SET tasks="${usr[0].tasks}" WHERE username = "${username}"`);
}
/* -------------PRIVATE-----------------*/

async function checkIfExists(username) {
	const user = await query(`SELECT * FROM users WHERE username = "${username}"`);
	return (user.length == 1);
}

/* Needs to be sure that there's no user with that username */
async function storeUser(username, password) {
	const hash = await hashPassword(password)
	await query(`INSERT INTO users VALUES ("${username}", "${hash}", "")`, 'run');
}

/* Needs to be sure that there's a user with that username */
async function validateUser(username, password) {
	const user = await query(`SELECT username, hash FROM users WHERE username = "${username}"`);
	const currentHash = user[0].hash;

	return (await bcrypt.compare(password, currentHash));
}

async function hashPassword(password) {
	const hash = await bcrypt.hash(password, 10);
	return hash;
}

const createTestUsers = async() => {
	const existingUsers = await query('SELECT * from users');

	if (existingUsers?.length === 0) {
		let usernames = ['TestUsr1', 'TestUsr2', 'TestUsr3'];
		let passwords = ['TestPwd1', 'TestPwd2', 'TestPwd3'];
		for (let i = 0; i < 3; i++) {
			await storeUser(usernames[i], passwords[i]);
		}
	}
};

export {dbReturn, dbInit, tryLogin, trySignUp, readTasks, addTask};