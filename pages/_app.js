import { ApolloProvider } from "@apollo/client";
// import { NextNProgress } from "nextjs-progressbar";
import ContextHandler from "utils/context/main";
import client from "utils/helpers/config/apollo-client";
import "../styles/globals.css";
import "../styles/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <NextNProgress /> // It gives `Element type is invalid` error! */}
      <ApolloProvider client={client}>
        <ContextHandler values={{ name: "Ujenbasi" }}>
          <Component {...pageProps} />
        </ContextHandler>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
