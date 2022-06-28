import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "../../../lib/db";
import {User} from "../../../models";
import {verifyPassword} from "../../../lib/auth";

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                await db();
                const {username, password} = credentials;
                const user = await User.findOne({username});
                if (!user) {
                    throw new Error("User not found");
                }
                if (!(await verifyPassword(password, user.password))) {
                    throw new Error("Invalid password");
                }
                return {id: user._id};
            }
        })
    ]
})