import {getUser} from "../../../../lib/auth";
import {Types} from "mongoose";
import Item from "../../../../models/item";
import {Market} from "../../../../models";
import {MarketItemSerializer} from "../../../../lib/serializers/item";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {market, url, price} = req.body;
        const {itemId} = req.query;
        const user = await getUser(req, res);
        if (user.markets.filter(m => m.toString() === market).length === 0) {
            res.status(401).json({error: "Unauthorized"});
        }
        const item = await Item.findById(itemId);
        const marketObj = await Market.findById(market);
        item.markets.push({
            _id: marketObj._id,
            name: marketObj.name,
            price: parseInt(price),
            url
        });
        await item.save();
        res.status(200).json({markets: item.markets.map(MarketItemSerializer)});
    }
}