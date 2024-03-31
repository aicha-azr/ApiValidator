const mongoose = require('mongoose');
const Joi = require('joi');

// Définition du schéma de validation Joi pour l'utilisateur
const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Définition du schéma de modèle Mongoose pour l'utilisateur
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

// Création du modèle utilisateur avec Mongoose
const User = mongoose.model('User', userSchema);

// Fonction pour valider les données utilisateur avec Joi
function validateUser(user) {
  return userValidationSchema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
