const mongoose = require('mongoose');

const projetSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    imagesProjet: { type: String, required: true },
    list: [
      { 
        motClef: { type: String, required: true }
      },
    ],
  },
);

// Ajouter le champ virtuel 'id' basé sur '_id'
projetSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Conversion de '_id' en 'id' lors de la conversion en JSON
projetSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('projet', projetSchema);