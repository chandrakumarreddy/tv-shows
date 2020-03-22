import React from "react";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Header />
      <Component {...pageProps} />
      <style jsx>{`
        body {
          margin: 0;
        }
        :global(ul) {
          padding: 0;
          margin: 0;
          list-style: none;
        }
      `}</style>
    </React.Fragment>
  );
}

export default MyApp;
