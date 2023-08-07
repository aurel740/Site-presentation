const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    images: [
      { 
        image: { type: String, required: true }
      }
    ],
    resume:{type:String, required:true},
    description:{type:String, required:true},
    lien:{type:String}
  },
);

// Ajouter le champ virtuel 'id' basé sur '_id'
portfolioSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Conversion de '_id' en 'id' lors de la conversion en JSON
portfolioSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('portfolio', portfolioSchema);