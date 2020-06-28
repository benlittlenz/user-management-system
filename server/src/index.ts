import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from 'typeorm';
import cookieParser from "cookie-parser";

import { User } from "./entity/User";
import { createuserToken } from "./createTokens";
import { verify } from 'jsonwebtoken';

(async () => {
  const app = express();
  app.use(cookieParser());

  app.get("/", (_req, res) => {
    res.send("hidffs");
  });

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.gdsfs;
    if (!token) return res.send({ ok: false, userToken: "" });
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, userToken: "" });
    }

    // Check if token is valid, if so, send back access token
    const user = await User.findOne({ user_id: payload.userId });
    if (!user) {
      return res.send({ ok: false, userToken: "" });
    }
    return res.send({ ok: true, userToken: createuserToken(user) });
  });

  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log("server running");
  });
})();