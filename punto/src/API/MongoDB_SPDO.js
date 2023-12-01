const mongoose = require('mongoose');


// Définition du schéma pour la collection "Partie"
const PartieSchema = new mongoose.Schema({
    id_joueur_gagnant: Number,
    manches_gagnees: Number,
    nbTours: Number,
    points_joueur1: Number,
    points_joueur2: Number,
    points_joueur3: Number,
    points_joueur4: Number
});

// Enregistrement du schéma en tant que modèle
mongoose.model('Partie', PartieSchema);


class MongoDB_SPDO {
    constructor() {
        const host = '127.0.0.1';
        const port = 27017;
        const databaseName = 'BDD_Punto_Mongo';

        const uri = `mongodb://${host}:${port}/${databaseName}`;
        mongoose.connect(uri);

        this.connection = mongoose.connection;

        this.connection.on('error', console.error.bind(console, 'Database connection error:'));
        this.connection.once('open', () => {
            console.log('Connected to the MongoDB database.');
        });
    }
    

    static getInstance() {
        if (!this.instance) {
            this.instance = new MongoDB_SPDO();
        }
        return this.instance;
    }

    getCollection(collectionName) {
        return mongoose.model(collectionName);
    }


    async insertOne(collectionName, document) {
        const Model = this.getCollection(collectionName);
        const newDocument = new Model(document);
        await newDocument.save();
        return newDocument._id;
    }

    async find(collectionName, filter) {
        const Model = this.getCollection(collectionName);
        return Model.find(filter).exec();
    }

    async updateOne(collectionName, filter, update) {
        const Model = this.getCollection(collectionName);
        return Model.updateOne(filter, update).exec();
    }

    async deleteOne(collectionName, filter) {
        const Model = this.getCollection(collectionName);
        return Model.deleteOne(filter).exec();
    }
}

module.exports = MongoDB_SPDO;