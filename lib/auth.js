import {compare, hash} from "bcrypt";
import {User} from "../models";
import {getSession} from "next-auth/react";

export async function hashPassword(password) {
    return hash(password, 10)
}

export async function verifyPassword(password, hash) {
    return compare(password, hash)
}

export async function getServerSession(req, res) {
    // TODO - currently getSession is unstable for working with backend
    return await getSession({req, res});
}

export async function getUser(req, res) {
    const session = await getServerSession(req, res);
    if (!session?.user?.id) return null;
    return User.findById(session.user.id);
}