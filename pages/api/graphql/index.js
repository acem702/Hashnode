import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";
import connect from "../../../server/config/db.js";

dotenv.config();

// CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
};

async function startApolloServer(typeDefs, resolvers) {
  try {
    const app = express();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      // cors: cors(corsOptions),
      context: async ({ req, res }) => {
        return { req, res };
      },
    });

    await server.start();

    app.use(CookieParser());
    app.use(graphqlUploadExpress());
    connect();

    server.applyMiddleware({ app, cors: corsOptions });

    await new Promise((resolve) => app.listen({ port: 5000 }, resolve));

    console.log(
      `🚀 Server ready at localhost:5000${server.graphqlPath}` // https://hashnode-azure.vercel.app
    );
  } catch (err) {
    console.log("Error: ", err);
  }
}

startApolloServer(typeDefs, resolvers);
