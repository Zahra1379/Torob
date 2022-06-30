import {css} from "@emotion/react";
import SearchIcon from '@mui/icons-material/Search';
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import SearchContext from "../context/search";
import {Button, Dropdown, Form} from "react-bootstrap";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";

export function SearchBox({className, style}) {
    const router = useRouter();
    const {q, setQ} = useContext(SearchContext);
    const [query, setQuery] = useState(q);

    useEffect(() => {
        setQuery(q);
    }, [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        setQ(query);
        router.push(`/search?q=${query}`);
    }

    return <form css={css`
      border: 1px solid #ced4da;
      border-radius: .25rem;
      display: flex;
      align-items: center;
      background: var(--primary-white);
    `} className={className} style={style} onSubmit={handleSearch}>
        <SearchIcon className="mx-2"/>
        <input css={css`
          border: none;
          padding: .6rem .75rem;
          font-weight: 300;
          line-height: 1.5;
          color: var(--primary-input);
          background: transparent;
          width: 100%;

          &:focus {
            outline: none;
          }`} type="text" placeholder="نام کالا را وارد کنید" value={query} onChange={e => setQuery(e.target.value)}/>
    </form>;
}

export function Filters(props) {

    const {category, setCategory} = useContext(SearchContext)

    const [selectedCategories, setSelectedCategories] = useState([]);

    function handleFilter(e) {
        e.preventDefault();
        setCategory(selectedCategories);
    }

    const {data: categories} = useSWR("/api/categories", async url => (await axios.get(url)).data, {
        revalidateIfStale: false, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: false
    });

    const allCategories = [];
    if (categories) {
        for (let category of categories)
            for (let subcategory of category.children)
                allCategories.push(...subcategory.children);
    }

    return (
        <form {...props} onSubmit={handleFilter}>
            <Button type="submit" variant="outline-secondary">
                <FilterAltIcon/>
                اعمال فیلتر
            </Button>
            <div className="overflow-auto w-100 bg-white d-flex flex-column rounded my-2 px-2 py-1"
                 css={css`height: 30vh;
                   border: 1px solid var(--bs-secondary)`}>
                {allCategories.map(category => (
                    <Form.Check name={category} type="checkbox" key={category} label={category} className="text-muted"
                                onChange={e => {
                                    if (e.target.checked)
                                        setSelectedCategories([...selectedCategories, category]);
                                    else
                                        setSelectedCategories(selectedCategories.filter(c => c !== category));
                                }}/>
                ))}
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                    ترتیب بر اساس
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Link passHref href="/search?q=&sortBy=price-desc">
                        <Dropdown.Item>ارزان ترین</Dropdown.Item>
                    </Link>
                    <Link passHref href="/search?q=&sortBy=price-asc">
                        <Dropdown.Item>گران ترین</Dropdown.Item>
                    </Link>
                    <Link passHref href="/search?q=&sortBy=name-asc">
                        <Dropdown.Item>جدید ترین</Dropdown.Item>
                    </Link>
                    <Link passHref href="/search?q=&sortBy=name-desc">
                        <Dropdown.Item>قدیمی ترین</Dropdown.Item>
                    </Link>
                </Dropdown.Menu>
            </Dropdown>
        </form>
    )
}