import React from "react";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Header />
      <Component {...pageProps} />
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Baloo+2&display=swap");
        :global(body) {
          margin: 0;
          font-family: "Baloo 2", cursive;
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
