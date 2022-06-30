import db from "../db";
import {findByIds} from "./search";

export async function getFavorites(user) {
    await db();
    return await findByIds(user.favorites);
}