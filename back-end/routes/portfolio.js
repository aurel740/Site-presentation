const express = require('express');
const auth = require('../middleware/auth');
const { upload, optimizeImage } = require('../middleware/multer-config');
const portfolioCtrl = require('../controllers/portfolio');

const router = express.Router();

router.post('/', auth, upload, optimizeImage, portfolioCtrl.createPortfolio);
router.get('/', portfolioCtrl.getAllPortfolio);
router.put('/:id', auth, upload, optimizeImage, portfolioCtrl.modifyPortfolio);
router.delete('/:id', auth, portfolioCtrl.deletePortfolio);
router.get('/:id', portfolioCtrl.getOnePortfolio);

module.exports = router;