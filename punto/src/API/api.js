const MySQL_SPDO = require('./MySQL_SPDO'); // Remplacez './MySQL_SPDO' par le chemin correct du fichier
const MongoDB_SPDO = require('./MongoDB_SPDO'); // Assurez-vous de spécifier le chemin correct


async function insertGameData1(gameData) {
    const db = MySQL_SPDO.getInstance();

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

        console.log('Lignes affectées :', result);
    } catch (error) {
        console.error('Erreur lors de l\'insertion :', error.message);
    }
}


async function insertGameData(gameData) {
    const db = MongoDB_SPDO.getInstance();
    
    try {
        const insertedId = await db.insertOne('Partie', gameData);
        console.log(`Données insérées avec l'ID : ${insertedId}`);
    } catch (err) {
        console.error(`Erreur lors de l'insertion des données : ${err}`);
    }
}






// Exemple d'utilisation de la fonction pour insérer des données
const gameData = {
    id_joueur_gagnant: 1,
    manches_gagnees: 2,
    points_joueur1: 10,
    points_joueur2: 8,
    points_joueur3: 12,
    points_joueur4: 5
};

//insertGameData(gameData);
//insertGameData1(gameData);


