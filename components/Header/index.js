import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import isAuthenticated from "../../helpers/isAuthenticated";
import countries from "../../utils/codes";

export default function Header() {
  const router = useRouter();
  const [country, setCountry] = React.useState(router.query.country ?? "");

  const handleSelect = e => {
    setCountry(e.target.value);
    router.push("/[country]", `/${e.target.value}`);
  };
  const options = () => {
    return countries.map(_country => (
      <option value={_country.code} key={_country.code}>
        {_country.country}
      </option>
    ));
  };
  const handleSignout = () => {
    nookies.destroy(null, "token");
  };
  React.useEffect(() => {
    if (country) {
      nookies.set(null, "defaultCountry", country),
        {
          maxAge: 30 * 24 * 60 * 60,
          path: "/"
        };
    }
  }, [country]);
  return (
    <div className="header">
      <div>
        <Link href="/" as="/">
          <a>
            <img src="/images/logo.png" alt="logo" width="100" height="20" />
          </a>
        </Link>
      </div>
      <select onChange={handleSelect} value={country}>
        <option value="">please select</option>
        {options()}
      </select>
      {isAuthenticated() && (
        <Link href="/[country]" as={`/${country}`}>
          <a className="logout" onClick={handleSignout}>
            Logout
          </a>
        </Link>
      )}
      <style jsx>{`
        .logo {
          color: #fff;
          text-decoration: none;
        }
        .header {
          display: flex;
          justify-content: space-between;
          background-color: #333;
          color: #fff;
          padding: 20px;
          text-align: center;
          margin-bottom: 10px;
        }
        .logout {
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
