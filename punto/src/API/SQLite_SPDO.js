const sqlite3 = require('sqlite3').verbose();

class SQLite_SPDO {
    constructor(dbPath) {
        if (!SQLite_SPDO.instance) {
            this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Connexion à la base de données SQLite réussie');
                }
            });

            SQLite_SPDO.instance = this;
        }

        return SQLite_SPDO.instance;
    }

    static getInstance(dbPath) {
        return new SQLite_SPDO(dbPath);
    }

    getConnection() {
        return this.db;
    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = SQLite_SPDO;
