import MainNavbar from "./main-navbar";
import {Fragment} from "react";
import SearchNavbar from "./search-navbar";

export default function Layout({ children }) {
    return (
        <Fragment>
            <SearchNavbar />
            <MainNavbar/>
            {children}
        </Fragment>
    )
}