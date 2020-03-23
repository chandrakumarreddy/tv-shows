import Router from "next/router";
import nookies from "nookies";

function Home() {
  return null;
}

Home.getInitialProps = context => {
  const country =
    context.query.country || nookies.get(context).defaultCountry || "us";
  process.browser
    ? Router.replace("/[country]", `${country}`)
    : context.res.writeHead(302, { Location: `/${country}` });

  context.res.end();
};

export default Home;
