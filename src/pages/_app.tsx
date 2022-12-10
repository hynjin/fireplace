import '../styles/globals.css';
import '../foundations/styles/fonts/font.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>Post Office</title>
                <meta name="post office" content="letter" />
                <link rel="icon" href="../../ForkAndKnife.ico" />
            </Head>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;
