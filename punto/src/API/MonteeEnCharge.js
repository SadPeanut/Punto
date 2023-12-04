const { insertPartieMongoDB } = require("./api.js");
const { insertPartieMySQL } = require("./api.js");
const { insertPartieSQLite } = require("./api.js");
const { insertPlayMySQL } = require("./api.js");
const { insertPlaySQLite } = require("./api.js");


// Fonction pour générer des données aléatoires
function generateRandomData() {
    return {
        id_joueur_gagnant: Math.floor(Math.random() * 3), // Génère un nombre aléatoire entre 0 et 99 pour l'id_joueur_gagnant
        dateDebut: new Date(), // Date actuelle pour dateDebut
        dateFin: new Date(), // Date actuelle pour dateFin
        manches_gagnees: 2, // Génère un nombre aléatoire entre 0 et 9 pour les manches_gagnees
        nbTours: Math.floor(Math.random() * 20), // Génère un nombre aléatoire entre 0 et 19 pour nbTours
        points_joueur1: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur1
        points_joueur2: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur2
        points_joueur3: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur3
        points_joueur4: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur4
    };
}

function generateRandomPlayData(){
    return {
        id_joueur: Math.floor(Math.random() * 3), // Génère un nombre aléatoire entre 0 et 2 pour l'id_joueur
        x: Math.floor(Math.random() * 15) - 7, // Génère un nombre aléatoire entre -7 et 7 pour x
        y: Math.floor(Math.random() * 15) - 7, // Génère un nombre aléatoire entre -7 et 7 pour y
        carte: Math.floor(Math.random() * 9) + 1 // Génère un nombre aléatoire entre 1 et 9 pour la carte
    };
}


function generateRandomDataMongo() {
    const generateTuple = () => [Math.floor(Math.random() * 15) - 7, Math.floor(Math.random() * 15) - 7]; // Génère un tuple [-7 à 7, -7 à 7]
    
    return {
        id_joueur_gagnant: Math.floor(Math.random() * 3), // Génère un nombre aléatoire entre 0 et 2 pour l'id_joueur_gagnant
        dateDebut: new Date(), // Date actuelle pour dateDebut
        dateFin: new Date(), // Date actuelle pour dateFin
        manches_gagnees: 2, // Valeur fixe pour manches_gagnees
        nbTours: Math.floor(Math.random() * 20), // Génère un nombre aléatoire entre 0 et 19 pour nbTours
        points_joueur1: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur1
        points_joueur2: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur2
        points_joueur3: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur3
        points_joueur4: Math.floor(Math.random() * 50), // Génère un nombre aléatoire entre 0 et 49 pour les points_joueur4
        plays_joueur1: Array.from({ length: 5 }, generateTuple), // Tableaux de 5 tuples générés aléatoirement
        plays_joueur2: Array.from({ length: 5 }, generateTuple),
        plays_joueur3: Array.from({ length: 5 }, generateTuple),
        plays_joueur4: Array.from({ length: 5 }, generateTuple)
    };
}



// Fonction principale pour simuler la montée en charge sur les bases de données avec des données aléatoires
async function monteeEnChargePartie() {
    // Nombre de requêtes à envoyer pour simuler la montée en charge
    const numberOfRequests = 20; // Modifier selon vos besoins

    // Exécuter des requêtes d'insertion simulées avec des données aléatoires dans chaque base de données
    for (let i = 0; i < numberOfRequests; i++) {
        const randomData = generateRandomData();
        const randomDataMongo = generateRandomDataMongo();

        // Insérer dans MySQL avec des données aléatoires
        await insertPartieMySQL(randomData);
        // Insérer dans SQLite avec des données aléatoires
        await insertPartieSQLite(randomData);

        // Insérer dans MongoDB avec des données aléatoires
        await insertPartieMongoDB(randomDataMongo);
    }
}

async function monteeEnChargePlay() {
    // Nombre de requêtes à envoyer pour simuler la montée en charge
    const numberOfRequests = 20; // Modifier selon vos besoins

    // Exécuter des requêtes d'insertion simulées avec des données aléatoires dans chaque base de données
    for (let i = 0; i < numberOfRequests; i++) {
        const randomPlayData = generateRandomPlayData();

        // Insérer dans MySQL avec des données aléatoires
        await insertPlayMySQL(randomPlayData);
        // Insérer dans SQLite avec des données aléatoires
        await insertPlaySQLite(randomPlayData);
    }
}


monteeEnChargePartie();
monteeEnChargePlay();