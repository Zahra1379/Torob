import {getUser} from "../../../../lib/auth";
import {Types} from "mongoose";
import db from "../../../../lib/db";
import {getFavorites} from "../../../../lib/data/favorite";
import {ItemPriceSerializer} from "../../../../lib/serializers/item";

export default async function addToFavorites(req, res) {
    await db();
    if (req.method === 'POST') {
        const {itemId} = req.query;
        const user = await getUser(req, res);
        if (!user) return;
        user.favorites.push(Types.ObjectId(itemId));
        await user.save();
        const favorites = await getFavorites(user);
        res.status(200).json(favorites.map(item => ({
            ...ItemPriceSerializer(item),
            liked: true
        })));
    }
    if (req.method === 'DELETE') {
        const {itemId} = req.query;
        const user = await getUser(req, res);
        if (!user) return;
        user.favorites = user.favorites.filter(id => id.toString() !== itemId);
        await user.save();
        const favorites = await getFavorites(user);
        res.status(200).json(favorites.map(item => ({
            ...ItemPriceSerializer(item),
            liked: true
        })));
    }
}