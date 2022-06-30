import {search} from "../../../lib/data/search";
import {ItemPriceSerializer} from "../../../lib/serializers/item";
import db from "../../../lib/db";

export default async function searchHandler(req, res) {
    await db();
    const items = await search(req.query);
    res.status(200).json(items.map(ItemPriceSerializer));
}