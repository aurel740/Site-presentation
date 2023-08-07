const multer = require('multer');
const sharp = require('sharp');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage }).array('images', 4); // Accepte jusqu'à 4 fichiers

// eslint-disable-next-line consistent-return
const optimizeImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  try {
    await Promise.all(
      req.files.map(async (file) => {
        const { destination, filename } = file;
        const outputFilename = `${filename.split('.')[0]}.webp`;

        await sharp(file.path)
          .webp({ quality: 70 })
          .toFile(`${destination}/${outputFilename}`);
        
        file.filename = outputFilename;
      })
    );
  } catch (error) {
    return next(error);
  }

  next();
};

module.exports = {
  upload,
  optimizeImage,
};
