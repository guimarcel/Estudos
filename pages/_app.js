import React from "react"
import App from "next/app"
import Head from "next/head"
import "../styles/global.scss"

class MyApp extends App {
    // remove this 'getInitialProps' if you don't plan on render blocking
    // for example, signing a user in before the requested page is loaded
    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: {
                ...(Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {})
            }
        };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </>
        );
    }
}

export default MyApp;