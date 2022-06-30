import {search} from "../../lib/data/search";
import useSWRInfinite from "swr/infinite";
import {useContext, useEffect, useState} from "react";
import SearchContext from "../../context/search";
import Layout from "../../components/layout";
import {ItemPriceSerializer} from "../../lib/serializers/item";
import {Button, Offcanvas, Row} from "react-bootstrap";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Filters} from "../../components/search";
import {ItemCard} from "../../components/items";

export default function SearchPage({query, items: initialItems}) {

    const [showFilters, setShowFilters] = useState(false);

    const {
        q,
        category,
        maxPrice,
        minPrice,
        sortBy,
        setCategory,
        setMaxPrice,
        setMinPrice,
        setQ,
        setSortBy
    } = useContext(SearchContext);

    useEffect(() => {
        setCategory(category.concat(query.category));
        setMaxPrice(query.maxPrice);
        setMinPrice(query.minPrice);
        setQ(query.q);
        setSortBy(query.sortBy);
    }, [query]);

    const {data, size, setSize, error, isValidating} = useSWRInfinite(
        (pageIndex, previousPageData) => {
            if (previousPageData && !previousPageData.length) return null
            let res = `/api/items/search?page=${pageIndex}&limit=20`;
            if (q) res += `&q=${q}`;
            if (category.length) for (let c of category) res += `&category=${c}`;
            if (maxPrice) res += `&maxPrice=${maxPrice}`;
            if (minPrice) res += `&minPrice=${minPrice}`;
            if (sortBy) res += `&sortBy=${sortBy}`;
            return res;
        },
        (url) => fetch(url).then(res => res.json()),
        {fallbackData: initialItems, revalidate: true}
    );

    const items = data ? [].concat(...data) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);
    const isRefreshing = isValidating && data && data.length === size;

    return (
        <Layout>
            <Row>
                <Row className="col-lg-3 d-lg-flex d-sm-none d-none">
                    <Filters/>
                </Row>
                <Row className="col-lg-9 overflow-auto m-0">
                    <Row className="d-lg-none m-0 mt-3">
                        <Button variant="outline-secondary" className="w-25" onClick={() => setShowFilters(true)}>
                            <FilterAltIcon/>
                            فیلتر
                        </Button>
                    </Row>
                    {items.map(ItemCard)}
                </Row>
            </Row>

            <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>فیلتر</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Filters/>
                </Offcanvas.Body>
            </Offcanvas>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const {query} = context;
    const items = await search(query);
    return {
        props: {
            query,
            items: items.map(ItemPriceSerializer),
        }
    }
}