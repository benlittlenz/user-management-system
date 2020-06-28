import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from 'typeorm';
import cookieParser from "cookie-parser";

(async () => {
  const app = express();
  app.use(cookieParser());

  app.post("/refresh_token", (req, res) => {
    console.log(req.headers)
  });

  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server running");
  });
})();