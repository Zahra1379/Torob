import Item from "../../models/item";
import {ItemViewSerializer} from "../../lib/serializers/item";
import Layout from "../../components/layout";
import {Button, Container, Modal, Table} from "react-bootstrap";
import {priceFormat} from "../../components/i18n";
import {getUser} from "../../lib/auth";
import {AddMarketForm} from "../../components/markets/form";
import {useState} from "react";

export default function ItemPage({item, canAddMarket}) {
    const [showAddMarket, setShowAddMarket] = useState(false);

    return (
        <Layout>
            <Container>
                <h2 className="my-5">{item.name}</h2>
                <h5 className="m-3">توضحات محصول</h5>
                <hr/>
                <p>{item.description}</p>
                <h5 className="m-3">مشخصات تکمیلی</h5>
                <hr/>
                <Table striped>
                    <tbody>
                    {Object.entries(item.details).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <h5 className="m-3">فروشگاه ها</h5>
                <hr/>
                <div>
                    {item.markets.map(market => (
                        <div className="p-3 bg-white rounded d-flex justify-content-between border-bottom border-3" key={market.id}>
                            <div className="d-flex flex-column">
                                <h6>{market.name}</h6>
                                <span>{priceFormat(market.price)} تومان</span>
                            </div>
                            <Button className="bg-red border-none shadow-none px-4"
                                    onClick={() => {
                                        window.open(market.url, '_blank');
                                    }}>خرید</Button>
                        </div>
                    ))}
                    {canAddMarket && <Button className="my-3" onClick={() => {setShowAddMarket(true)}}>
                        افزودن قیمت
                    </Button>}
                </div>
            </Container>
            <Modal show={showAddMarket} onHide={() => {setShowAddMarket(false)}}>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <AddMarketForm itemId={item.id} onSuccess={() => setShowAddMarket(false)} />
                </Modal.Body>
            </Modal>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const {itemId} = context.query;
    const user = await getUser(context.req, context.res);
    if (!user) return {redirect: '/auth'};
    console.log(user)
    const item = await Item.findById(itemId);
    return {
        props:
            {
                item: ItemViewSerializer(item),
                canAddMarket: user.roles.includes('owner')
            }
    };
}