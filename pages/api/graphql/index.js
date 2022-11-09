import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";
import connectDB from "../../../server/models/post.model.js";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

// CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
};

connectDB();

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

    server.applyMiddleware({ app, cors: corsOptions });

    await new Promise((resolve) => app.listen({ port: 5000 }, resolve));

    console.log(
      `🚀 Server ready at http://localhost:5000${server.graphqlPath}`
    );
  } catch (err) {
    console.log("Error: ", err);
  }
}

startApolloServer(typeDefs, resolvers);
