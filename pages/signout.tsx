import Router from "next/router";
import { useEffect } from "react";
import { destroyCookie } from "nookies";

const Signout = () => {
  useEffect(() => {
    destroyCookie(null, "jwtToken");
    Router.push("/login");
  }, []);

  return <p>You are singing out</p>;
};

export default Signout;
