import {Category} from "../../../models";
import db from "../../../lib/db";

export default async function getCategories(req, res) {
    const { method } = req
    if (method === 'GET') {
        await db();
        const categories = await Category.find({})
        return res.status(200).json(categories)
    }
}