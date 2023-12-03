const MySQL_SPDO = require('./MySQL_SPDO'); // Remplacez './MySQL_SPDO' par le chemin correct du fichier
const MongoDB_SPDO = require('./MongoDB_SPDO'); // Assurez-vous de spécifier le chemin correct
const SQLite_SPDO = require('./SQLite_SPDO'); // Assurez-vous de spécifier le chemin correct

//lancement de l'api et de la route /Partie
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));


app.listen(port, () => {
    console.log(`API Punto listening at http://localhost:${port}`)
});

app.post('/Partie', async (req, res) => {
    const { gameData, playsData, dataBase } = req.body; // Les données du jeu et le type de base de données envoyés depuis le client
    
    switch (dataBase) {
        case 'MySQL':
            await insertPartieMySQL(gameData);
            break;
        case 'MongoDB':
            await insertPartieMongoDB(gameData, playsData);
            break;
        case 'SQLite':
            await insertPartieSQLite(gameData);
            break;
        default:
            console.error('Type de base de données non valide');
            return res.status(400).json({ error: 'Type de base de données non valide' });
    }

    res.status(200).json({ message: 'Données du jeu insérées avec succès dans la base de données' });
});

app.post('/Plays', async (req, res) => {
    const { playData, dataBase } = req.body; // Les données du jeu et le type de base de données envoyés depuis le client
    
    switch (dataBase) {
        case 'MySQL':
            await insertPlayMySQL(playData);
            break;
            
        case 'SQLite':
            await insertPlaySQLite(playData);
            break;
            
        default:
            console.error('Type de base de données non valide');
            return res.status(400).json({ error: 'Type de base de données non valide' });
    }

    res.status(200).json({ message: 'Données du jeu insérées avec succès dans la base de données' });
});

async function insertPartieMySQL(gameData) {
    const db = MySQL_SPDO.getInstance();
    console.log("mysql data : ", gameData);
    try {
        const insertQuery = `
            INSERT INTO partie 
            (id_joueur_gagnant, manches_gagnees, nbTours, points_joueur1, points_joueur2, points_joueur3, points_joueur4) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(insertQuery, [
            gameData.id_joueur_gagnant,
            gameData.manches_gagnees,
            gameData.nbTours,
            gameData.points_joueur1,
            gameData.points_joueur2,
            gameData.points_joueur3,
            gameData.points_joueur4
        ]);

        console.log("mysql query : ", result);

        console.log('Lignes affectées :', result);
    } catch (error) {
        console.error('Erreur lors de l\'insertion :', error.message);
    }
}



async function insertPlayMySQL(playsData) {
    const db = MySQL_SPDO.getInstance();
    console.log("mysql data : ", playsData);
    try {
        const insertQuery = `
            INSERT INTO play 
            (id_partie, id_joueur, x, y, carte)
            VALUES (?, ?, ?, ?, ?)
        `;

        const lastIDQuery  = 'SELECT MAX(id_partie) FROM partie';

        const lastID = await db.query(lastIDQuery);

        const result = await db.query(insertQuery, [
            lastID,
            playsData.id_joueur,
            playsData.x,
            playsData.y,
            playsData.carte
        ]);

        console.log("mysql query : ", result);

        console.log('Lignes affectées :', result);
    } catch (error) {
        console.error('Erreur lors de l\'insertion :', error.message);
    }
}


async function insertPartieMongoDB(gameData) {
    const db = MongoDB_SPDO.getInstance();
    console.log("MongoDB Data", gameData);
    
    const donnees = {
        id_joueur_gagnant: gameData.id_joueur_gagnant,
        manches_gagnees: gameData.manches_gagnees,
        nbTours: gameData.nbTours,
        points_joueur1: gameData.points_joueur1,
        points_joueur2: gameData.points_joueur2,
        points_joueur3: gameData.points_joueur3,
        points_joueur4: gameData.points_joueur4,
        plays_joueur1: gameData.plays_joueur1,
        plays_joueur2: gameData.plays_joueur2,
        plays_joueur3: gameData.plays_joueur3,
        plays_joueur4: gameData.plays_joueur4
    }

    try {
        const insertedId = await db.insertOne('Partie', donnees);
        console.log(`Données insérées avec l'ID : ${insertedId}`);
    } catch (err) {
        console.error(`Erreur lors de l'insertion des données : ${err}`);
    }
}


async function insertPartieSQLite(gameData){
    const db = SQLite_SPDO.getInstance('C:/Users/slani/OneDrive/Desktop/BDDs_Punto/BDD_Sqlite/BDD_Punto_SQLite.db');

    try {
        const insertQuery = `
            INSERT INTO Partie 
            (id_joueur_gagnant, manches_gagnees, nbTours, points_joueur1, points_joueur2, points_joueur3, points_joueur4) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(insertQuery, [
            gameData.id_joueur_gagnant,
            gameData.manches_gagnees,
            gameData.nbTours,
            gameData.points_joueur1,
            gameData.points_joueur2,
            gameData.points_joueur3,
            gameData.points_joueur4
        ]);

        console.log('Lignes affectées :', result);
    } catch (err) {
        console.error(`Erreur lors de l'insertion des données : ${err}`);
    }
}


async function insertPlaySQLite(playsData){
    const db = SQLite_SPDO.getInstance('C:/Users/slani/OneDrive/Desktop/BDDs_Punto/BDD_Sqlite/BDD_Punto_SQLite.db');

    try {
        const insertQuery = `
            INSERT INTO play
            (id_partie, id_joueur, x, y, carte)
            VALUES (?, ?, ?, ?, ?)
        `;

        const lastIDQuery = 'SELECT MAX(id_Partie) AS last_partie_id FROM Partie';
        const lastIDResult = await db.query(lastIDQuery);
        const lastID = lastIDResult[0]['last_partie_id'];

        const result = await db.query(insertQuery, [
            lastID,
            playsData.id_joueur,
            playsData.x,
            playsData.y,
            playsData.carte
        ]);

        console.log('Lignes affectées :', result);
    } catch (err) {
        console.error(`Erreur lors de l'insertion des données : ${err}`);
    }
}



module.exports =  {
    insertPartieMongoDB,
    insertPartieMySQL,
    insertPartieSQLite
};