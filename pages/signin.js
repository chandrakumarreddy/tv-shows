import React from "react";
import axios from "axios";
import nookies from "nookies";
import Link from "next/link";
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
      nookies.set(null, "token", response.data.token, {
        path: "/"
      });
      const { prevPath } = nookies.get();
      const { href = "/[country", as = "/us" } = JSON.parse(prevPath);
      router.replace(href, as);
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
      />{" "}
      <button
        type="submit"
        className={`button ${!email || !password ? "disabled" : ""}`}
        disabled={!email || !password}
      >
        Submit
      </button>
      <div className="signin__otheroptions">
        <Link href="/signup">
          <a>Create account here</a>
        </Link>
        <Link href="/forgotPassword">
          <a>Forgot Password</a>
        </Link>
      </div>
      <style jsx>
        {`
          .signin__otheroptions {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </form>
  );
}
