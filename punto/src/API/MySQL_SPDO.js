const mysql = require('mysql');

class MySQL_SPDO {
    constructor() {
        const host = '127.0.0.1';
        const db = 'BDD_Punto_MySQL';
        const user = 'root';
        const pass = 'root';

        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: host,
            user: user,
            password: pass,
            database: db,
            charset: 'utf8mb4'
        });
    }
    
    static getInstance() {
        if (!this.instance) {
            this.instance = new MySQL_SPDO();
        }
        return this.instance;
    }

    getConnection() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                resolve(connection);
            });
        });
    }

    

    async query(query, params = []) {
    try {
        const connection = await this.getConnection();
        const result = await new Promise((resolve, reject) => {
            connection.query(query, params, (err, rows) => {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });

        let lastInsertId = null;
        let rowCount = null;

        if (query.trim().toUpperCase().startsWith('INSERT')) {
            rowCount = result.affectedRows;
            lastInsertId = result.insertId;
        } else {
            rowCount = result.length;
        }

        if (lastInsertId !== null) {
            return { rowCount, lastInsertId };
        } else {
            return rowCount;
        }
    } catch (error) {
        throw new Error("Erreur lors de la requête SQL : " + error.message);
    }
}
}

module.exports = MySQL_SPDO;
