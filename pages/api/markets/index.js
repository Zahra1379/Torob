import {getSession} from "next-auth/react";
import {getUser} from "../../../lib/auth";
import {Market} from "../../../models";
import {MarketLightSerializer} from "../../../lib/serializers/market";
import db from "../../../lib/db";

export default async function handler(req, res) {
    await db();
    if (req.method === 'POST') {
        const user = await getUser(req, res);
        const {name} = req.body;
        const market = await Market.create({name});
        user.markets.push(market._id);
        await user.save();
        res.status(200).json({market: MarketLightSerializer(market)});
    }

    if (req.method === 'GET') {
        const user = await getUser(req, res);
        if (!user) return res.status(401).json({error: "Unauthorized"});
        const markets = await Market.find({ _id: { $in: user.markets } });
        res.status(200).json({markets: markets.map(MarketLightSerializer)});
    }
}