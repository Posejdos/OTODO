import sqlite3 from 'sqlite3'

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

const createTestUsers = async() => {
	const existingUsers = await query('SELECT * from users');

	if (existingUsers?.length === 0) {
		let usernames = ['Jadwiga', 'Baltazar', 'Tirex'];
		let passwords = ['Dupadupa', 'Manikir', 'jdiwoa'];
		for (let i = 0; i < 3; i++) {
			let name = usernames[i];
			let pwd = passwords[i];
			let id = i;

			await query(`INSERT INTO users VALUES (${id}, "${name}", "${pwd}")`, 'run');
		}
	}
};

db.serialize(async () => {
    await query("CREATE TABLE IF NOT EXISTS users (id integer, username text, passwordHash text)", 'run');
	await createTestUsers();

	const existingUsers = await query('SELECT id, username, passwordHash FROM users');
	console.log(existingUsers);
});