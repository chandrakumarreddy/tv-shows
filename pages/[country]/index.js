import axios from "axios";
import Thumbnail from "../../components/Thumbnail";

export default function Country({ shows }) {
  const renderShows = () => {
    return shows.map((_show, index) => <Thumbnail {..._show} key={index} />);
  };
  return <ul>{renderShows()}</ul>;
}

Country.getInitialProps = async context => {
  const country = context.query.country || "US";
  const response = await axios.get(
    `http://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
  );
  return {
    shows: response.data
  };
};
