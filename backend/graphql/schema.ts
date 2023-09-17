import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { db } from '../dbconfig'; // Assurez-vous que le chemin vers votre fichier de configuration de base de données est correct.
import { hashPassword, searchUserByUsernameOrEmail } from '../utils';

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
    checkUserExists: {
      type: GraphQLBoolean,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          const existingUser = await searchUserByUsernameOrEmail(
            args.username,
            args.email
          );
          if (existingUser) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          // Gérez les erreurs ici si la recherche échoue.
          console.error(
            "Erreur lors de la recherche d'utilisateur existant :",
            error
          );
          throw error;
        }
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
