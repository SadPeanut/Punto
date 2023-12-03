# Jeu de Punto

Punto est un jeu de cartes dans lequel les joueurs doivent poser 4 cartes de la même couleur dans le but de former une suite logique : une rangée, une colonne ou une diagonale.

Règles complètes du Punto: https://montvalsurloir.bibli.fr/doc_num.php?explnum_id=4140

## Installation


### Présentation du projet
Ce projet a été réalisé dans le cadre de la formation BUT3 Informatique à l'IUT de Vannes, dans le module "Nouveaux paradigmes de bases de données".
Il a été réalisé par : Lucas TORRI, 3ème année.

Le framework utilisé pour ce projet est React.js, et l'API est réalisée en Node.js.
Les bases de données utilisées sont MySQL, MongoDB et SQLite.
Les ports utilisés sont le 3000 pour l'application et le 5000 pour l'API.


### Prérequis
- Node.js
- Git
- MongoDB
- MySQL
- SQLite

### Étapes d'installation

### 1. Installation et création des bases de données :

##### Noms des BDDs :
- MySQL : *BDD_Punto_MySQL*
- MongoDB : *BDD_Punto_MongoDB*
- SQLite : *BDD_Punto_SQLite*

 #####  MySQL : https://dev.mysql.com/doc/
 ##### MongoDB : https://www.mongodb.com/docs/
 ##### SQLite : https://www.sqlite.org/docs.html

Après avoir créé les 3 bases de données, créez dans chacune une table :

##### MySQL : 
```bash
CREATE  TABLE BDD_Punto_MySQL ( id INT AUTO_INCREMENT PRIMARY KEY, id_joueur_gagnant INT, manches_gagnees INT, nbTours INT, points_joueur1 INT, points_joueur2 INT, points_joueur3 INT, points_joueur4 INT );
```

##### MongoDB : 

```bash
db.createCollection("Partie")
```

##### SQLite : 
```bash
CREATE  TABLE Partie ( id INTEGER  PRIMARY KEY AUTOINCREMENT, id_joueur_gagnant INTEGER, manches_gagnees INTEGER, nbTours INTEGER, points_joueur1 INTEGER, points_joueur2 INTEGER, points_joueur3 INTEGER, points_joueur4 INTEGER );
```
Pour SQLite il faudra changer le chemin de la BDD (dbPath) dans le fichier ```punto/src/api/api.js``` dans la méthode ```insertPartieSQLite(gameData)```.

### 2. Installation des fichiers de l'application

Dans votre éditeur de code, clonez le dépôt dans le répertoire de votre choix :
```bash
git clone https://github.com/SadPeanut/Punto.git 
```
Toutes les commandes restantes seront exécutées depuis un terminal ouvert en ```/punto```

Installez l'application :
```bash
npm install
```

### 3. Lancement de l'application

Lancez l'application :
```bash
npm start
```
L'application devrait ouvrir automatiquement un onglet dans votre navigateur par défaut sur le port 3000 de localhost.

### 4. Lancement de l'API

Pour lancer l'API, exécutez cette commande dans un nouveau terminal (au même endroit) : 
```bash
node src/api/api.js
```

L'API devrait se lancer, en affichant : *API Punto listening at http://localhost:5000*

### 5. Jouez!

Vous avez maintenant tout configuré pour pouvoir jouer à Punto!

Veillez à laisser les 2 terminaux ouverts lors de votre utilisation pour garantir le fonctionnement de l'application.