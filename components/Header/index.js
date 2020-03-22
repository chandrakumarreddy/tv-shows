import React from "react";
import { useRouter } from "next/router";
import countries from "../../utils/codes";

export default function Header() {
  const router = useRouter();
  const [country, setCountry] = React.useState(router.query.country);
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
  return (
    <div className="header">
      <div>TvShows</div>
      <select onChange={handleSelect} value={country}>
        {options()}
      </select>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          background-color: #333;
          color: #fff;
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
