import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout";
import {SearchBox} from "../components/search";
import {Fragment} from "react";
import {MainNavbar} from "../components/layout/navbar";

export default function Home() {
    return (
        <Fragment>
            <MainNavbar />
            <main className={styles.container}>
                <Head>
                    <title>ترب | موتور جستجوی هوشمند محصولات</title>
                    <meta name="description" content="موتور جستجوی هوشمند محصولات"/>
                </Head>
                <main className="d-flex justify-content-center align-items-center">
                    <SearchBox style={{width: "60%", marginTop: "30vh"}}/>
                </main>
            </main>
        </Fragment>
    )
}