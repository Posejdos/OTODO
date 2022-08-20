import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

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

/* Needs to be sure that there's no user with that username */
async function storeUser(username, password) {
	const hash = await hashPassword(password)
	await query(`INSERT INTO users VALUES ("${username}", "${hash}")`, 'run');
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

db.serialize(async () => {
    await query("CREATE TABLE IF NOT EXISTS users (username text, hash text)", 'run');
	await createTestUsers();

	const existingUsers = await query('SELECT rowid as id, username, hash FROM users');
	console.log(await validateUser("TestUsr2", "TestPwd2"));
	console.log(await validateUser("TestUsr2", "Testpwd2"));
});