const fs = require('fs');
const Portfolio = require('../models/portfolio');

exports.createPortfolio = (req, res) => {
  const portfolioObject = req.body;
  delete portfolioObject._id;
  delete portfolioObject.userId;
  console.log("Données de portfolioObject :", portfolioObject);
  const images = req.files;
  const imageUrls = Object.values(images).map((image) => ({
    image: `${req.protocol}://${req.get('host')}/images/${image.filename}`,
  }));  

  const portfolio = new Portfolio({
    ...portfolioObject,
    userId: req.auth.userId,
    id: portfolioObject._id,
    images: imageUrls,
  });
  console.log("Données de portfolio :", portfolio);
  portfolio.save()
    .then(() => { res.status(201).json(portfolio); })
    .catch((error) => { res.status(400).json({ error }); });
};

exports.modifyPortfolio = (req, res) => {
   Portfolio.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePortfolio = (req, res) => {
   Portfolio.findOne({ _id: req.params.id })
    .then(( portfolio) => {
      if ( portfolio.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename =  portfolio.imageUrl.split('/images/')[1];
        // supprimer un fichier avec fs (file system)
        fs.unlink(`images/${filename}`, () => {
           portfolio.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }); })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOnePortfolio = (req, res) => {
   Portfolio.findOne({ _id: req.params.id })
    .then(( portfolio) => res.status(200).json( portfolio))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllPortfolio = (req, res) => {
   Portfolio.find()
    .then(( portfolio) => res.status(200).json( portfolio))
    .catch((error) => res.status(400).json({ error }));
};