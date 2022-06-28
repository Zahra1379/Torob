import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout";
import {SearchBox} from "../components/search";

export default function Home() {
    return (
        <Layout className={styles.container}>
            <Head>
                <title>ترب | موتور جستجوی هوشمند محصولات</title>
                <meta name="description" content="موتور جستجوی هوشمند محصولات"/>
            </Head>
            <main className="d-flex justify-content-center align-items-center">
                <SearchBox style={{width: "60%", marginTop: "30vh"}} />
            </main>
        </Layout>
    )
}