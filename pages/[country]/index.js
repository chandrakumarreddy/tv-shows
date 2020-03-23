import Error from "next/error";
import axios from "axios";
import nookies from "nookies";
import Thumbnail from "../../components/Thumbnail";

export default function Country({ shows, country, statusCode }) {
  if (statusCode) return <Error statusCode={statusCode} />;
  const renderShows = () => {
    return shows.map((_show, index) => (
      <li key={index}>
        <Thumbnail
          as={`/${country}/${_show.show.id}`}
          name={_show.show.name}
          image={_show.show.image}
          href="/[country]/[showId]"
        />
      </li>
    ));
  };
  return (
    <ul className="tvshows-grid">
      {renderShows()}
      <style jsx>{`
        .tvshows-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        @media only screen and (max-width: 600px) {
          .tvshows-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </ul>
  );
}

Country.getInitialProps = async context => {
  try {
    const country =
      context.query.country || nookies.get(context).defaultCountry || "US";
    const response = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
    );

    return {
      shows: response.data,
      country
    };
  } catch (error) {
    return { statusCode: error.response ? error.response.status : 500 };
  }
};
