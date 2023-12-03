const MySQL_SPDO = require('./MySQL_SPDO'); // Remplacez './MySQL_SPDO' par le chemin correct du fichier
const MongoDB_SPDO = require('./MongoDB_SPDO'); // Assurez-vous de spécifier le chemin correct
const SQLite_SPDO = require('./SQLite_SPDO'); // Assurez-vous de spécifier le chemin correct


async function clearTablesSQLite() {
    const db = SQLite_SPDO.getInstance('C:/Users/slani/OneDrive/Desktop/BDDs_Punto/BDD_Sqlite/BDD_Punto_SQLite.db');

    try {
        await db.query('DELETE FROM play');
        await db.query('DELETE FROM Partie');
        console.log('Contenu des tables vidé avec succès dans SQLite.');
    } catch (error) {
        console.error('Erreur lors de la suppression du contenu des tables :', error.message);
    }
}


async function clearTablesMySQL() {
    const db = MySQL_SPDO.getInstance();

    try {
        await db.query('DELETE FROM play');
        await db.query('DELETE FROM partie');
        console.log('Contenu des tables vidé avec succès dans MySQL.');
    } catch (error) {
        console.error('Erreur lors de la suppression du contenu des tables :', error.message);
    }
}


async function clearCollectionMongoDB() {
    const db = MongoDB_SPDO.getInstance(); // Assurez-vous d'avoir une méthode pour vous connecter à MongoDB

    try {
        const collection = db.getCollection('Partie'); // Remplacez 'Partie' par le nom de votre collection MongoDB

        await collection.deleteMany({}); // Supprime toutes les données de la collection
        console.log('Données de la collection vidé avec succès dans MongoDB.');
    } catch (error) {
        console.error('Erreur lors de la suppression des données de la collection :', error.message);
    }
}


clearCollectionMongoDB();
clearTablesMySQL();
clearTablesSQLite();