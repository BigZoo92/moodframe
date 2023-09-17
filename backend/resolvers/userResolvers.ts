// userResolvers.ts

import { db } from '../dbconfig'; // Importez votre connexion à la base de données ou toute autre source de données nécessaire
import { hashPassword } from '../utils/passwordUtils';

const userResolvers = {
  Query: {
    // Exemple de résolveur pour obtenir un utilisateur par ID
    user: async (parent, args) => {
      try {
        // Écrivez ici la logique pour récupérer un utilisateur par ID depuis votre base de données
        // Par exemple, si vous avez une fonction getUserById dans votre backend,
        // vous pouvez l'appeler ici et renvoyer l'utilisateur correspondant.
        // return getUserById(args.user_id);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        throw error;
      }
    },
  },
  Mutation: {
    // Exemple de résolveur pour l'inscription d'un utilisateur
    registerUser: async (parent, args) => {
      try {
        // Hachez le mot de passe avant de le stocker dans la base de données
        const hashedPassword = await hashPassword(args.password);
        const newUser = await db.one(
          'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
          [args.username, args.email, hashedPassword]
        );

        // La requête ci-dessus insère les données dans la table "users" et renvoie les données de l'utilisateur inséré.
        // Vous pouvez maintenant renvoyer ces données en tant qu'utilisateur nouvellement inscrit.
        return newUser;
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        throw error;
      }
    },
  },
};

export default userResolvers;
