import nookies from "nookies";

export default function isAuthenticated(context) {
  const { token } = nookies.get(context);
  return token;
}
