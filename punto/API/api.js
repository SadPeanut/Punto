const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000; // Vous pouvez choisir n'importe quel port que vous préférez

// Définir une route
app.get('/', (req, res) => {
  res.send('Bienvenue sur votre API Express !');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});


app.get('/cum', (req, res) => {
    res.send('lalalalalalouli');
    });






/*
db.parties.insertOne({
  joueurId: "id_du_joueur_qui_a_gagne",
  coupsPourGagner: 15
})
*/