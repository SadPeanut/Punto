const { insertPartieMongoDB } = require("./api.js");
const { insertPartieMySQL } = require("./api.js");
const { insertPartieSQLite } = require("./api.js");


// Fonction pour générer des données aléatoires
function generateRandomData() {
    return {
        id_joueur_gagnant: Math.floor(Math.random() * 3), // Génère un nombre aléatoire entre 0 et 99 pour l'id_joueur_gagnant
        manches_gagnees: 2, // Génère un nombre aléatoire entre 0 et 9 pour les manches_gagnees
        nbTours: Math.floor(Math.random() * 20), // Génère un nombre aléatoire entre 0 et 19 pour nbTours
        points_joueur1: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur1
        points_joueur2: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur2
        points_joueur3: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur3
        points_joueur4: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur4
    };
}


let requestsCount = 0; // Compteur de requêtes

// Fonction principale pour simuler la montée en charge sur les bases de données avec des données aléatoires
async function simulateLoad() {
    // Nombre de requêtes à envoyer pour simuler la montée en charge
    const numberOfRequests = 20; // Modifier selon vos besoins

    // Exécuter des requêtes d'insertion simulées avec des données aléatoires dans chaque base de données
    for (let i = 0; i < numberOfRequests; i++) {
        const randomData = generateRandomData();

        // Insérer dans MongoDB avec des données aléatoires
        await insertPartieMongoDB(randomData);
        // Insérer dans MySQL avec des données aléatoires
        await insertPartieMySQL(randomData);
        // Insérer dans SQLite avec des données aléatoires
        await insertPartieSQLite(randomData);

        // Incrémentez le compteur de requêtes
        requestsCount++;

        // Si le nombre de requêtes atteint 20, arrêtez la fonction
        if (requestsCount === numberOfRequests) {
            console.log(numberOfRequests + " donnée(s) insérée(s) dans chaque base de données avec succès !"); // Affiche le nombre de requêtes exécutées
            return; // Arrête l'exécution de la fonction
        }
    }
}

simulateLoad();