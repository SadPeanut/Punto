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
    const { data, dataBase } = req.body; // Les données du jeu et le type de base de données envoyés depuis le client
    
    switch (dataBase) {
        case 'MySQL':
            await insertPartieMySQL(data);
            break;
        case 'MongoDB':
            await insertPartieMongoDB(data);
            break;
        case 'SQLite':
            await insertPartieSQLite(data);
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


module.exports =  {
    insertPartieMongoDB,
    insertPartieMySQL,
    insertPartieSQLite
};