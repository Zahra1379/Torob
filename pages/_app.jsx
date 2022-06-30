import '../styles/globals.css'
import '../styles/font.css'
import {SessionProvider} from "next-auth/react";
import Forbidden from "../components/layout/forbidden";
import {SearchProvider} from "../context/search";

function App({Component, pageProps}) {
    return (
        <SearchProvider>
            <SessionProvider session={pageProps.session}>
                {pageProps.forbidden ? <Forbidden/> : <Component {...pageProps}/>}
            </SessionProvider>
        </SearchProvider>
    )
}

export default App
