import {useForm} from "react-hook-form";
import axios from "axios";
import {useEffect, useState} from "react";

export function CreateMarketForm({onSuccess}) {

    function onSubmit(data) {
        axios.post("/api/markets", data)
            .then(() => {
                if (onSuccess) onSuccess();
            })
    }

    const {register, handleSubmit} = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input className="form-control shadow-none my-2" name="name" {...register('name')} placeholder="نام فروشگاه را وارد کنید" />
            <button className="form-control shadow-none my-2" type="submit">افزودن</button>
        </form>
    )
}

export function AddMarketForm({onSuccess, itemId}) {
    const {register, handleSubmit} = useForm()

    const [markets, setMarkets] = useState([]);

    useEffect(() => {
        axios.get("/api/markets")
            .then(res => setMarkets(res.data.markets))
    }, []);

    function onSubmit(data) {
        console.log(data)
        axios.post(`/api/items/${itemId}/market`, data)
            .then(() => {
                if (onSuccess) onSuccess();
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select className="form-control shadow-none my-2" name="market" {...register('market')}>
                {markets.length > 0 && markets.map(market => (
                    <option key={market.id} value={market.id}>{market.name}</option>
                ))}
            </select>
            <input className="form-control shadow-none my-2" name="price" {...register('price')} placeholder="قیمت را وارد کنید" />
            <input className="form-control shadow-none my-2" name="url" {...register('url')} placeholder="آدرس صفحه را وارد کنید" />
            <button className="form-control shadow-none my-2" type="submit">افزودن</button>
        </form>
    )
}