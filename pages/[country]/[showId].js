import parse from "html-react-parser";
import axios from "axios";
import Cast from "../../components/Cast";

export default function ShowId({ show }) {
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
  const showId = context.query.showId;
  let show = {};
  try {
    const response = await axios.get(
      `http://api.tvmaze.com/shows/${showId}?embed=cast`
    );
    show = response.data;
  } catch (error) {
    console.log(error.message);
  }
  return {
    show
  };
};
