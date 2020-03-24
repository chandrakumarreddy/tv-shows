import axios from "axios";
import { GET_CAST } from "../utils/urls";

export default function Cast({ person }) {
  return JSON.stringify(person);
}

Cast.getInitialProps = async ({ query }) => {
  const response = await axios.get(`${GET_CAST}/${query.personId}`);
  return {
    person: response.data
  };
};
