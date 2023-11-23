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
    console.log(`Example app listening at http://localhost:${port}`)
});

app.post('/Partie', async (req, res) => {
    const gameData = req.body; // Les données du jeu envoyées depuis le client
    console.log("gameData : ", gameData)
    // Insérez les données dans chaque base de données
    try {
        await insertPartieMySQL(gameData);
        await insertPartieMongoDB(gameData);
        await insertPartieSQLite(gameData);

        // Répondre au client avec un succès
        res.status(200).json({ message: 'Données du jeu insérées avec succès dans les bases de données' });
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données :', error.message);
        // En cas d'erreur, renvoyer un statut d'erreur au client
        res.status(500).json({ error: 'Erreur lors de l\'insertion des données' });
    }
});


async function insertPartieMySQL(gameData) {
    const db = MySQL_SPDO.getInstance();
    console.log("mysql data : ", gameData);
    try {
        const insertQuery = `
            INSERT INTO partie 
            (id_joueur_gagnant, manches_gagnees, points_joueur1, points_joueur2, points_joueur3, points_joueur4) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(insertQuery, [
            gameData.id_joueur_gagnant,
            gameData.manches_gagnees,
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



async function insertPartieMongoDB(gameData) {
    const db = MongoDB_SPDO.getInstance();
    console.log("MongoDB Data", gameData)
    
    try {
        const insertedId = await db.insertOne('Partie', gameData);
        console.log(`Données insérées avec l'ID : ${insertedId}`);
    } catch (err) {
        console.error(`Erreur lors de l'insertion des données : ${err}`);
    }
}



async function insertPartieSQLite(gameData){
    const db = SQLite_SPDO.getInstance('C:/Users/slani/OneDrive/Desktop/BDDs_Punto/BDD_Sqlite/BDD_Punto.db');

    try {
        const insertQuery = `
            INSERT INTO Partie 
            (id_joueur_gagnant, manches_gagnees, points_joueur1, points_joueur2, points_joueur3, points_joueur4) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(insertQuery, [
            gameData.id_joueur_gagnant,
            gameData.manches_gagnees,
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




