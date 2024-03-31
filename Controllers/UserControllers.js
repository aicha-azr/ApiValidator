const { User, validateUser } = require("../Model/UserSchema");

const controllers = {
    post: async (req, res)=>{
      
        
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
    }
}
module.exports = controllers;