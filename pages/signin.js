import React from "react";
import axios from "axios";
import nookies from "nookies";
import { SIGNIN } from "../utils/urls";
import TextField from "../components/TextField";
import { isEmail, isRequired } from "../utils/validators";
import { useRouter } from "next/router";

const initialValue = {
  email: "",
  password: ""
};

export default function Signin() {
  const [initialState, setState] = React.useState(initialValue);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const handleChange = e => {
    const { name, value } = e.target;
    setState(p => ({ ...p, [name]: value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(SIGNIN, { ...initialState });
      nookies.set(null, "token", response.token, {
        path: "/"
      });
      router.replace("/[country]", "us");
    } catch (error) {
      setError(error.response?.data?.message ?? "Something went wrong");
    }
  };
  const { email, password } = initialState;
  return (
    <form onSubmit={handleSubmit}>
      {error && typeof error !== "boolean" && (
        <div className="error">{error}</div>
      )}
      <TextField
        type="text"
        name="email"
        value={email}
        onBlur={isEmail}
        onChange={handleChange}
        onError={setError}
        placeholder="Please enter an Email"
      />
      <TextField
        type="password"
        name="password"
        value={password}
        onBlur={isRequired}
        onChange={handleChange}
        onError={setError}
        placeholder="Please enter an Password"
      />
      <button
        type="submit"
        className={`button ${!email || !password || error ? "disabled" : ""}`}
        disabled={!email || !password || error}
      >
        Submit
      </button>
    </form>
  );
}
