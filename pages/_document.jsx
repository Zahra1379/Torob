import Document, {Html, Head, Main, NextScript} from 'next/document'

class BaseComponent extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href="/styles/font.css" rel="stylesheet"/>
                    <link rel="icon" href="/favicon.png"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default BaseComponent;