import axios from "axios";

export default function Country({ shows }) {
  const renderShows = () => {
    return shows.map((_show, index) => {
      const { show } = _show;
      return <li key={index}>{show.name}</li>;
    });
  };
  return <ul>{renderShows()}</ul>;
}

Country.getInitialProps = async props => {
  const response = await axios.get(
    "http://api.tvmaze.com/schedule?country=US&date=2014-12-01"
  );
  return {
    shows: response.data
  };
};
