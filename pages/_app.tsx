import "../styles/globals.css";
import "highlight.js/styles/github.css";
import "crosswords-js/dist/crosswords.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../src/context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
