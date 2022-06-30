export function MarketLightSerializer(market) {
    return {
        id: market._id.toString(),
        name: market.name,
    }
}