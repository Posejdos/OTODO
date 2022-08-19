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

db.serialize(async () => {
    await query("CREATE TABLE IF NOT EXISTS users (id integer, username text, passwordHash text)", 'run');
});