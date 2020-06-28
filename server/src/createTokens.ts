import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

export const createuserToken = (user: User) => {
    return sign({ userId: user.user_id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m",
    });
};

export const createRefreshToken = (user: User) => {
    return sign(
        { userId: user.user_id, tokenVersion: user.tokenV },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d",
        },
    );
};