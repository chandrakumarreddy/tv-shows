import axios from "axios";
import Thumbnail from "../../components/Thumbnail";

export default function Country({ shows, country }) {
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
  const country = context.query.country || "US";
  let shows = [];
  try {
    const response = await axios.get(
      `http://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
    );
    shows = response.data;
  } catch (error) {
    console.log(error, "error==>");
  }
  return {
    shows,
    country
  };
};
