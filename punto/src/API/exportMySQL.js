const { createObjectCsvWriter, createObjectCsvStringifier } = require('csv-writer');
const MySQL_SPDO = require('./MySQL_SPDO'); // Assurez-vous de spécifier le chemin correct

async function exportMySQLToCSV() {
    const db = MySQL_SPDO.getInstance();

    // Récupérer les données de la table Partie
    const parties = await db.query('SELECT * FROM Partie');

    // Récupérer les données de la table Play
    const plays = await db.query('SELECT * FROM Play');

    const csvWriter = createObjectCsvWriter({
        path: './Exports/Partie.csv',
        header: [
            { id: '_id', title: '_id' },
            { id: 'dateDebut', title: 'dateDebut' },
            { id: 'dateFin', title: 'dateFin' },
            { id: 'id_joueur_gagnant', title: 'id_joueur_gagnant' },
            { id: 'manches_gagnees', title: 'manches_gagnees' },
            { id: 'nbTours', title: 'nbTours' },
            { id: 'points_joueur1', title: 'points_joueur1' },
            { id: 'points_joueur2', title: 'points_joueur2' },
            { id: 'points_joueur3', title: 'points_joueur3' },
            { id: 'points_joueur4', title: 'points_joueur4' },
        ],
    });

    // Écrire les données de la table Partie
    await csvWriter.writeRecords(parties);

    // Créer un stringifier pour la deuxième feuille (table Play)
    const stringifier = createObjectCsvStringifier({
        header: [
            { id: 'id', title: 'id' },
            { id: 'id_joueur', title: 'id_joueur' },
            { id: 'x', title: 'x' },
            { id: 'y', title: 'y' },
            { id: 'carte', title: 'carte' },
        ],
    });

    // Écrire les données de la table Play dans la deuxième feuille
    const playsCSV = stringifier.getHeaderString() + stringifier.stringifyRecords(plays);
    require('fs').appendFileSync('./Exports/Partie.csv', `\n${playsCSV}`);

    console.log('Export de la base de données terminé.');
}

// Appeler la fonction pour exporter les données
exportMySQLToCSV()
    .then(() => console.log('Export de la base de données terminé.'))
    .catch(err => console.error('Erreur lors de l\'export :', err));
