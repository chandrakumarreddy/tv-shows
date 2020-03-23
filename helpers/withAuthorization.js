import { PureComponent } from "react";
import nookies from "nookies";
import Router from "next/router";

const authenticate = context => {
  const { token } = nookies.get(context);
  if (context.req && !token) {
    context.res.writeHead(302, { Location: "/signin" });
    context.res.end();
    return;
  } else if (!token) {
    Router.push("/signin");
  }

  return token;
};

export default function WithAuthorization(WrapperComponent) {
  return class Authentication extends PureComponent {
    static async getInitialProps(context) {
      try {
        const token = authenticate(context);
        const componentProps = await WrapperComponent.getInitialProps?.(
          context
        );
        return { ...componentProps, token };
      } catch (error) {
        console.log(error);
      }
    }
    render() {
      return <WrapperComponent {...this.props} />;
    }
  };
}
