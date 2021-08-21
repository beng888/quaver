import "../styles/globals.css";
import { GlobalContextWrapper } from "../src/context";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextWrapper>
      <Component {...pageProps} />
    </GlobalContextWrapper>
  );
}

export default MyApp;
