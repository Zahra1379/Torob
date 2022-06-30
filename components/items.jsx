import axios from "axios";
import Link from "next/link";
import {priceFormat} from "./i18n";
import {Button} from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export function ItemCard(item) {

    function like(item) {
        if (item.liked) axios.delete(`/api/items/${item.id}/favorite`);
        else axios.post(`/api/items/${item.id}/favorite`).then();
    }

    return <div className="p-3 col-md-6 col-lg-4" key={item.id}>
        <Link href={`/items/${item.id}`}>
            <div className="bg-white rounded p-3 cursor-pointer d-flex flex-column">
                <h5>{item.name}</h5>
                <div className="my-2">
                    {item.minPrice ? <><span
                            className="text-muted">{priceFormat(item.minPrice)}</span>{item.minPrice !== item.maxPrice && (<>
                            &nbsp;
                            تا
                            &nbsp;
                            <span className="text-muted">{priceFormat(item.maxPrice)}</span></>)}
                            &nbsp;
                            تومان
                        </>
                        : <span className="text-muted">ناموجود</span>}
                </div>
                <Button className="align-self-end shadow-none border-none" variant="link" onClick={e => {
                    e.stopPropagation();
                    like(item);
                }}>
                    {item.liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </Button>
            </div>
        </Link>
    </div>;
}