import {createContext, useState} from "react";

const SearchContext = createContext(
    {
        q: '',
        setQ: () => {
        },
        category: [],
        setCategory: () => {
        },
        sortBy: '',
        setSortBy: () => {
        },
        minPrice: null,
        setMinPrice: () => {
        },
        maxPrice: null,
        setMaxPrice: () => {
        },
    }
);

export function SearchProvider({children}) {

    const [q, setQ] = useState('');
    const [category, setCategory] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const context = {
        q,
        setQ,
        category,
        setCategory: category => category.filter(category => category).length && (typeof category === 'string' ? setCategory([category]) : setCategory(category)),
        sortBy,
        setSortBy,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
    };

    return <SearchContext.Provider value={context}>
        {children}
    </SearchContext.Provider>
}

export default SearchContext;