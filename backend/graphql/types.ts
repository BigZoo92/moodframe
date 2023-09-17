import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';

// Définissez d'abord les types pour vos données
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    // Vous pouvez ajouter d'autres champs spécifiques à un utilisateur ici
  }),
});

// Si vous avez d'autres types, vous pouvez les définir ici

export { UserType };
