import "../styles/globals.css";
import "highlight.js/styles/github.css";
import "crosswords-js/dist/crosswords.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
