const { GraphQLNonNull, GraphQLString } = require('graphql');
const { GraphQLEmailAddress } = require('graphql-scalars');
const UserType = require('../types/user.type');
const userService = require('../../../services/user.service');

module.exports = {
    createUser: {
        type: UserType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLEmailAddress) },
            password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_, args) => {
            return await userService.createUser(args);
        },
    },

    loginUser: {
        type: GraphQLString,
        args: {
            email: { type: new GraphQLNonNull(GraphQLEmailAddress) },
            password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (_, { email, password }) => {
            return await userService.loginUser(email, password);
        },
    },
};