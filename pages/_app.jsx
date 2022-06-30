import '../styles/globals.css'
import '../styles/font.css'
import {SessionProvider} from "next-auth/react";
import Forbidden from "../components/layout/forbidden";

function App({Component, pageProps}) {
    return (
        <SessionProvider session={pageProps.session}>
            {pageProps.forbidden ? <Forbidden/> : <Component {...pageProps}/>}
        </SessionProvider>
    )
}

export default App
