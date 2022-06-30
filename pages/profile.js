import {getUser} from "../lib/auth";
import {getFavorites} from "../lib/data/favorite";
import {ItemPriceSerializer} from "../lib/serializers/item";
import {Container, Row, Tab, Tabs} from "react-bootstrap";
import {ItemCard} from "../components/items";
import Layout from "../components/layout";
import {LoginForm, SignupForm} from "../components/auth/form";
import {useEffect, useState} from "react";

export default function ProfilePage({favorites}) {

    const [key, setKey] = useState("favorites");

    return (
        <Layout>
            <Container>
                <h2 className="my-3">حساب کاربری</h2>
                <Tabs
                    id="controlled-tab-forms"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="favorites" title="علاقه مندی ها" tabClassName="text-red preserve-color">
                        <Row>
                            {favorites.map(ItemCard)}
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps({req, res}) {
    const user = await getUser(req, res);
    if (!user) return {redirect: '/auth'};
    const favorites = await getFavorites(user);
    return {
        props: {
            favorites: favorites.map(item => ({
                ...ItemPriceSerializer(item),
                liked: true
            }))
        }
    }
}