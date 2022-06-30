import {useForm} from "react-hook-form";
import axios from "axios";

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