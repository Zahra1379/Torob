import {User} from "../../../models";
import {hashPassword} from "../../../lib/auth";
import mongoose from "mongoose";
import db from "../../../lib/db";

export default async function SignupHandler(req, res) {
    await db();
    console.log(mongoose.connection.readyState);
    const {username, password, email} = req.body
    const user = await User.create({username, password: await hashPassword(password), email})
    res.status(201).json(user)
}
