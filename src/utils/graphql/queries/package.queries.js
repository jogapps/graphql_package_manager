const { GraphQLList } = require('graphql');
const { GraphQLDate } = require('graphql-scalars');
const PackageType = require('../types/package.type');
const packageService = require('../../../services/package.service');

module.exports = {
    getPackages: {
        type: new GraphQLList(PackageType),
        args: { filterByExpiration: { type: GraphQLDate } },
        resolve: async (_, args, { req }) => {
            return await packageService.getPackages(args.filterByExpiration, req);
        },
    },
};