export function ItemPriceSerializer(item) {
    return {
        id: item._id.toString(),
        name: item.name,
        minPrice: item.minPrice,
        maxPrice: item.maxPrice,
    }
}

export function MarketItemSerializer(marketItem) {
    return {
        id: marketItem._id.toString(),
        name: marketItem.name,
        price: marketItem.price,
        url: marketItem.url ? marketItem.url : null,
    }
}

export function ItemViewSerializer(item) {
    return {
        id: item._id.toString(),
        name: item.name,
        description: item.description,
        details: Object.fromEntries(item.details),
        markets: item.markets.map(MarketItemSerializer),
    }
}