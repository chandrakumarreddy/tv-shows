import parse from "html-react-parser";
import axios from "axios";
import Error from "next/error";
import Cast from "../../components/Cast";

export default function ShowId({ show, statusCode }) {
  if (statusCode) return <Error statusCode={statusCode} />;
  return (
    <div className="show-details">
      <div
        className="show-details__poster"
        style={{ backgroundImage: `url(${show.image?.original})` }}
      />
      <h3>{show.name}</h3>
      {parse(show.summary)}
      {show._embedded.cast.length > 0 && <Cast cast={show._embedded.cast} />}
      <style jsx>{`
        .show-details__poster {
          height: 200px;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    </div>
  );
}

ShowId.getInitialProps = async context => {
  try {
    const showId = context.query.showId;
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${showId}?embed=cast`
    );
    return {
      show: response.data
    };
  } catch (error) {
    return { statusCode: error.response ? error.response.status : 500 };
  }
};
