import Router from "next/router";
import nookies from "nookies";

function Home() {
  return null;
}

Home.getInitialProps = context => {
  const country =
    context.query.country || nookies.get(context).defaultCountry || "us";
  if (process.browser) return Router.replace("/[country]", `/${country}`);
  else {
    context.res.writeHead(302, { Location: `/${country}` });
    return context.res.end();
  }
};

export default Home;
