import {Fragment} from "react";
import {MainNavbar, SearchNavbar} from "./navbar";

export default function Layout({children}) {
    return (
        <Fragment>
            <SearchNavbar/>
            <MainNavbar/>
            <main>{children}</main>
        </Fragment>
    )
}