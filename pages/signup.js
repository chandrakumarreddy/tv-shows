import React from "react";
import axios from "axios";
import nookies from "nookies";
import Link from "next/link";
import { SIGNUP } from "../utils/urls";
import TextField from "../components/TextField";
import { isEmail, isRequired } from "../utils/validators";
import { useRouter } from "next/router";

const initialValue = {
  email: "",
  password: "",
  name: ""
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
      const response = await axios.post(SIGNUP, { ...initialState });
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
  const { email, password, name } = initialState;
  return (
    <form onSubmit={handleSubmit}>
      {error && typeof error !== "boolean" && (
        <div className="error">{error}</div>
      )}
      <TextField
        type="text"
        name="name"
        value={name}
        onBlur={isRequired}
        onChange={handleChange}
        onError={setError}
        placeholder="Please enter Name"
      />
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
      <div className="signup__otheroptions">
        <Link href="/signin">
          <a>Already have an Account? Login here</a>
        </Link>
      </div>
      <style jsx>
        {`
          .signup__otheroptions {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </form>
  );
}
