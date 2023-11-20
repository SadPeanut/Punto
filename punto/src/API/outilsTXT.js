const fs = require('fs');

class OutilsTXT {
    static lireContenu(cheminFichier) {
        if (fs.existsSync(cheminFichier)) {
            return fs.readFileSync(cheminFichier, 'utf8');
        } else {
            return "Le fichier n'existe pas.";
        }
    }

    static ecrireContenu(cheminFichier, nouveauContenu) {
        try {
            fs.writeFileSync(cheminFichier, nouveauContenu);
            return "Le fichier a été mis à jour avec succès.";
        } catch (error) {
            return "Erreur lors de l'écriture dans le fichier : " + error.message;
        }
    }
}

module.exports = OutilsTXT;
