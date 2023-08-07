const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const portfolioRoutes = require('./routes/portfolio');
const projetRoutes = require('./routes/projet');
const userRoutes = require('./routes/user');
const contactRouter = require('./routes/contact');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cvsansimage.pfrg0fe.mongodb.net/`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use('/api/contact', contactRouter);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/projet',projetRoutes)
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;