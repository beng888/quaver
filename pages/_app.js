import "../styles/globals.css";
import "../styles/test.css";
import { GlobalContextWrapper } from "../src/context";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextWrapper>
      <Component {...pageProps} />
    </GlobalContextWrapper>
  );
}

export default MyApp;
