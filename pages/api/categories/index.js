import {Category} from "../../../models";

export default async function getCategories(req, res) {
    const { method } = req
    if (method === 'GET') {
        const categories = await Category.find({})
        return res.status(200).json(categories)
    }
}