const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        role: { type: GraphQLString }, // Role of the user (e.g., 'user', 'admin')
    }),
});

module.exports = UserType;