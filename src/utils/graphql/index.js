const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const userMutations = require('./mutations/user.mutations');
const packageMutations = require('./mutations/package.mutations');
const packageQueries = require('./queries/package.queries');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ...packageQueries,
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        ...userMutations,
        ...packageMutations,
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});