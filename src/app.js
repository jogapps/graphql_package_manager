require("dotenv").config();
const express = require('express');
const schema = require('./utils/graphql');
const db = require("./database/config/db");
const { ApolloServer } = require('apollo-server-express');
const authMiddleware = require("./middlewares/jwt.middleware");

db();

const app = express();

app.use(authMiddleware);

const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT || 4000;

server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen(process.env.PORT || 4000, () =>
        console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`)
    );
});