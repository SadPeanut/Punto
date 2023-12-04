const { createObjectCsvWriter } = require('csv-writer');
const MongoDB_SPDO = require('./MongoDB_SPDO'); // Assurez-vous de spécifier le chemin correct


async function exportMongoToCSV() {

    const db = MongoDB_SPDO.getInstance();

    const collection = db.getCollection('Partie');

    const parties = await collection.find({}).exec();

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
            { id: 'plays_joueur1', title: 'plays_joueur1' },
            { id: 'plays_joueur2', title: 'plays_joueur2' },
            { id: 'plays_joueur3', title: 'plays_joueur3' },
            { id: 'plays_joueur4', title: 'plays_joueur4' },
        ],
    });

    await csvWriter.writeRecords(parties);

    console.log('Export de la base de données terminé.');
}

// Appeler la fonction pour exporter les données
exportMongoToCSV()
    .then(() => console.log('Export de la base de données terminé.'))
    .catch(err => console.error('Erreur lors de l\'export :', err));
