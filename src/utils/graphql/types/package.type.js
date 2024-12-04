const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLID } = require('graphql');
const { GraphQLDate } = require('graphql-scalars');

const PackageType = new GraphQLObjectType({
    name: 'Package',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        expirationDate: { type: GraphQLDate },
        user_id: { type: GraphQLID }, // Reference to the user who created the package
    }),
});

module.exports = PackageType;