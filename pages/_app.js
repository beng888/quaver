import "../styles/globals.css";
import { GlobalContextWrapper } from "../src/context";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextWrapper>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </GlobalContextWrapper>
  );
}

export default MyApp;
