import {getSession} from "next-auth/react";
import db from "../../../lib/db";
import {Market, User} from "../../../models";
import Layout from "../../../components/layout";
import {Button, Container, Modal} from "react-bootstrap";
import {useState} from "react";
import Head from "next/head";
import {CreateMarketForm} from "../../../components/markets/form";
import axios from "axios";
import {MarketLightSerializer} from "../../../lib/serializers/market";
import Link from "next/link";

export default function MarketPage(props) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [markets, setMarkets] = useState(props.markets);

    const hideCreateModal = () => setShowCreateModal(false);

    const handleCreateMarket = () => {
        axios.get("/api/markets").then(res => setMarkets(res.data.markets));
        hideCreateModal();
    }

    return (
        <Layout>
            <Head>
                <title>مدیریت فروشگاه ها</title>
            </Head>
            <Container className="mt-2">
                <Button onClick={() => setShowCreateModal(true)} className="shadow-none" variant="outline-secondary">افزودن
                    فروشگاه</Button>
                <div className="d-flex py-3 flex-wrap">
                    {markets && markets.map(market => (
                        <div className="p-2 bg-transparent col-12 col-md-4" key={market.id}>
                            <Link href={`/admin/markets/${market.id}`}>
                                <div className="bg-white rounded p-2 cursor-pointer">
                                    <h5>{market.name}</h5>
                                    {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                                </div>
                            </Link>
                        </div>))}
                </div>

                <Modal show={showCreateModal} onHide={hideCreateModal}>
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <CreateMarketForm onSuccess={handleCreateMarket}/>
                    </Modal.Body>
                </Modal>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    await db();
    const session = await getSession(context);
    const id = session?.user?.id;
    if (!id) return {redirect: {destination: "/auth"}};
    const user = await User.findById(id);
    if (!user.roles.includes('owner')) return {props: {forbidden: true}};
    const markets = await Market.find({_id: {$in: user.markets}});
    return {
        props: {
            markets: markets.map(MarketLightSerializer),
        }
    }
}