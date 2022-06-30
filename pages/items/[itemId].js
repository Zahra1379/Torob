import Item from "../../models/item";
import {ItemViewSerializer} from "../../lib/serializers/item";
import Layout from "../../components/layout";
import {Button, Container, Table} from "react-bootstrap";
import {priceFormat} from "../../components/i18n";

export default function ItemPage({item}) {
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
                        <div className="p-3 bg-white rounded d-flex justify-content-between" key={market.id}>
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
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const {itemId} = context.query;
    const item = await Item.findById(itemId);
    return {props: {item: ItemViewSerializer(item)}};
}