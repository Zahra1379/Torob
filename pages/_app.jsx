import '../styles/globals.css'
import '../styles/font.css'
import Layout from "../components/layout";

function App({Component, pageProps}) {

    const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>);

    return (
        getLayout(<Component {...pageProps} />)
    )
}

export default App
