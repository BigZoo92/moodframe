import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import { db } from '../dbconfig'; // Assurez-vous que le chemin vers votre fichier de configuration de base de données est correct.
import { hashPassword } from '../utils/passwordUtils';

// 1. Définissez un type GraphQL pour votre utilisateur.
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    user_id: { type: new GraphQLNonNull(GraphQLInt) }, // L'ID de l'utilisateur
    username: { type: new GraphQLNonNull(GraphQLString) }, // Le nom d'utilisateur
    email: { type: new GraphQLNonNull(GraphQLString) }, // L'adresse e-mail
  }),
});

// 2. Définissez une requête GraphQL pour obtenir un utilisateur par ID.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Exemple de requête pour obtenir un utilisateur par ID.
    // Vous pouvez ajouter d'autres requêtes ici si nécessaire.
    user: {
      type: UserType,
      args: { user_id: { type: GraphQLInt } }, // L'argument user_id est attendu
      resolve(parent, args) {
        // Ici, vous pouvez écrire la logique pour récupérer un utilisateur par ID depuis votre base de données.
        // Par exemple, si vous avez une fonction getUserById dans votre backend,
        // vous pouvez l'appeler ici et renvoyer l'utilisateur correspondant.
        // return getUserById(args.user_id);
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    registerUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
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
  },
});

// 3. Définissez le schéma global qui regroupe toutes les requêtes.
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  // Vous pouvez ajouter des mutations ici si vous avez besoin de mettre à jour des données.
  // Par exemple, une mutation pour créer un nouvel utilisateur.
});

export default schema;
