import Link from "next/link";
import axios from "axios";
import Thumbnail from "../../components/Thumbnail";

export default function Country({ shows }) {
  const renderShows = () => {
    return shows.map((_show, index) => <Thumbnail {..._show} key={index} />);
  };
  return (
    <ul className="tvshows-grid">
      {renderShows()}{" "}
      <style jsx>{`
        .tvshows-grid {
          list-style-type: none;
          padding: 0;
          margin: 0;
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
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
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
    console.log(error.message);
  }
  return {
    shows
  };
};
