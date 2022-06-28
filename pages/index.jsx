import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from "../components/layout";
import {SearchBox} from "../components/search";

export default function Home() {
    return (
        <Layout className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="d-flex justify-content-center align-items-center">
                <SearchBox style={{width: "60%", marginTop: "30vh"}} />
            </main>
        </Layout>
    )
}