import Item from "../../models/item";

function preAggregateFilter(query) {
    const {category, name, q} = query;
    const categories = typeof category === 'string' ? [category] : category;
    let res = {};
    if (category) res.category = {$in: categories};
    if (name) res.name = {$regex: name, $options: 'i'};
    if (q) res.$text = {$search: q};
    return res;
}

function postAggregateFilter(query) {
    const {minPrice, maxPrice} = query;
    let res = {};
    if (minPrice) res.minPrice = {$gte: minPrice};
    if (maxPrice) res.maxPrice = {$lte: maxPrice};
    return res;
}

function sort(query) {
    const {sortBy} = query;
    let res = {};
    if (sortBy) {
        switch (sortBy) {
            case 'date-asc':
                res.createdAt = 1;
                break;
            case 'date-desc':
                res.createdAt = -1;
                break;
            case 'price-asc':
                res.minPrice = 1;
                break;
            case 'price-desc':
                res.minPrice = -1;
                break;
            default:
                res.createdAt = -1;
                break;
        }
    }
    return res;
}

function projection() {
    return {
        $project: {
            _id: 1, name: 1, createdAt: 1, minPrice: {
                $min: "$markets.price",
            }, maxPrice: {
                $max: "$markets.price",
            }
        }
    };
}

export async function search(query) {
    const pipeline = []

    const preAggregateFilterRes = preAggregateFilter(query);

    if (Object.keys(preAggregateFilterRes).length > 0) {
        pipeline.push({
            $match: preAggregateFilterRes,
        });
    }

    pipeline.push(projection());

    if (Object.keys(postAggregateFilter(query)).length > 0) {
        pipeline.push({
            $match: postAggregateFilter(query),
        });
    }

    if (Object.keys(sort(query)).length > 0) {
        pipeline.push({
            $sort: sort(query),
        });
    }

    return Item.aggregate(pipeline);
}

export async function findByIds(ids) {
    return Item.aggregate([
        {
            $match: {
                _id: {$in: ids}
            }
        },
        projection()
    ])
}