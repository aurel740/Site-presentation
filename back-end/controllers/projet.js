const fs = require('fs');
const Projet = require('../models/projet');

exports.createProjet = (req, res) => {
  const projetObject = req.body;
  delete projetObject._id;
  delete  projetObject.userId;
  console.log("Données de projetObject :", projetObject)
  console.log("Contenu de req.files :", req.files);
  console.log("Contenu de list :", projetObject.list);
  // Filtrer les clés de l'objet pour obtenir les mots-clés
  const listKeys = Object.keys(projetObject).filter((key) => key.startsWith('list'));
  
  // Créer un tableau d'objets de mots-clés à partir des valeurs filtrées
  const list = listKeys.map((key) => ({ motClef: projetObject[key] }));
  console.log("Contenu de list2 :", list);


  const  projet = new Projet({
    id: projetObject._id,
    userId: req.auth.userId,
    title: projetObject.title,
    imagesProjet: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
    list : list
  });
  projet.save()
    .then(() => { res.status(201).json( projet); })
    .catch((error) => { res.status(400).json({ error }); });
};

exports.modifyProjet = (req, res) => {
  Projet.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProjet = (req, res) => {
  Projet.findOne({ _id: req.params.id })
    .then(( projet) => {
      if ( projet.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename =  projet.imageUrl.split('/images/')[1];
        // supprimer un fichier avec fs (file system)
        fs.unlink(`images/${filename}`, () => {
           projet.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }); })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneProjet = (req, res) => {
  Projet.findOne({ _id: req.params.id })
    .then(( projet) => res.status(200).json( projet))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllProjet = (req, res) => {
  Projet.find()
    .then(( projet) => res.status(200).json( projet))
    .catch((error) => res.status(400).json({ error }));
};