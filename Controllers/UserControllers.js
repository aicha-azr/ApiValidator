const { User, validateUser } = require("../Model/UserSchema");

const controllers = {
  post: async (req, res) => {
    try {
      const newUser = new User({ // Créer un nouvel utilisateur avec les données validées
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      const { error } = validateUser(req.body); // Valider les données utilisateur avec Joi
      if (error) {
        return res.status(400).json({ error: error.details[0].message }); // Si la validation échoue, renvoyer une réponse d'erreur
      }
      const savedUser = await newUser.save(); // Enregistrer le nouvel utilisateur dans la base de données MongoDB
      res.status(201).json(savedUser); // Renvoyer une réponse avec les données de l'utilisateur créé
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }
  },
  put: async (req, res) => {
    try {
      const { error } = validateUser(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour des informations utilisateur" });
    }
  }


}
module.exports = controllers;
