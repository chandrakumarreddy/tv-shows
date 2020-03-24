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
        :global(form) {
          margin: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        :global(input) {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          box-sizing: border-box;
        }
        :global(button) {
          padding: 10px;
          background-color: blue;
          color: #fff;
          border: none;
          cursor: pointer;
          margin: 10px 0;
        }
        :global(.error) {
          color: red;
        }
        :global(.disabled) {
          cursor: not-allowed;
          background-color: gray;
        }
      `}</style>
    </React.Fragment>
  );
}

export default MyApp;
