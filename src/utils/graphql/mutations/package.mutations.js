const { GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLBoolean } = require('graphql');
const { GraphQLDate } = require('graphql-scalars');
const PackageType = require('../types/package.type');
const packageService = require('../../../services/package.service');

module.exports = {
    createPackage: {
        type: PackageType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            price: { type: new GraphQLNonNull(GraphQLFloat) },
            expirationDate: { type: new GraphQLNonNull(GraphQLDate) },
        },
        resolve: async (_, args, { req }) => {
            return packageService.createPackage(args, req);
        },
    },

    updatePackage: {
        type: PackageType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLString) },
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            price: { type: GraphQLFloat },
        },
        resolve: async (_, args, { req }) => {
            return packageService.updatePackage(args.id, args, req);
        },
    },

    deletePackage: {
        type: GraphQLBoolean,
        args: { id: { type: new GraphQLNonNull(GraphQLString) } },
        resolve: async (_, { id }, { req }) => {
            return packageService.deletePackage(id, req);
        },
    },
};