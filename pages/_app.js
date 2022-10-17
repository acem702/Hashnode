import { ApolloProvider } from "@apollo/client";
import ContextHandler from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import "../styles/globals.css";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ContextHandler values={{ name: "Ujenbasi" }}>
        <Component {...pageProps} />
      </ContextHandler>
    </ApolloProvider>
  );
}

export default MyApp;
