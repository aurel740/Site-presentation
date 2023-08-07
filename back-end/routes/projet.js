const express = require('express');
const auth = require('../middleware/auth');
const { upload, optimizeImage } = require('../middleware/multer-config');
const projetCtrl = require('../controllers/projet');

const router = express.Router();

router.post('/', auth, upload, optimizeImage, projetCtrl.createProjet);
router.get('/', projetCtrl.getAllProjet);
router.put('/:id', auth, upload, optimizeImage, projetCtrl.modifyProjet);
router.delete('/:id', auth, projetCtrl.deleteProjet);
router.get('/:id', projetCtrl.getOneProjet);

module.exports = router;