// import useSWR from "swr";
// import axios from "axios";

import {useSession} from "next-auth/react";

export function useUser() {
    // const {data} = useSWR("/api/auth/session", async url => (await axios.get(url)).data?.user);
    const {data} = useSession();
    return data?.user;
}