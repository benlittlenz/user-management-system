import { createRefreshToken, createuserToken } from "./createTokens";
import { UserContext } from "./UserContext";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
  Ctx,
  UseMiddleware,
  Int,
} from "type-graphql";
import "reflect-metadata";
import { hash, compare } from "bcryptjs";
import { User } from "./entity/User";
import { isLoggedIn } from "./isLoggedIn";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  userToken: string;

  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hey"
  }

  @Query(() => String)
  @UseMiddleware(isLoggedIn)
  bye(@Ctx() { payload }: UserContext) {
    console.log(payload);
    return `user_id is ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }


  @Query(() => User, { nullable: true })
  me(@Ctx() context: UserContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) return null;

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: UserContext) {
    res.cookie("gdsfs", "", {
      httpOnly: true,
      path: "/refresh_token"
    });

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokens(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ user_id: userId }, "tokenVersion", 1);
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: UserContext,
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error("No such user exists ");

    const valid = await compare(password, user.password);

    if (!valid) throw new Error("Could not find user");

    //login successfull
    res.cookie("gdsfs", createRefreshToken(user), {
      httpOnly: true,
      path: "/refresh_token"
    });

    return {
      userToken: createuserToken(user),
      user
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("is_admin") is_admin: boolean,
  ) {
    try {
      const hashedPassword = await hash(password, 12);
      await User.insert({
        firstName,
        lastName,
        email,
        is_admin,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

}