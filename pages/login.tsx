import axios from "axios";
import { FormEventHandler, useState } from "react";
import { LoginResponse } from "../lib/types/User";
import { Axios, backendUrl, setAxiosBearerToken } from "../lib/utils/backend";
import { useAuth } from "../src/context/auth-context";
import styles from "../styles/Login.module.scss";
import Router from "next/router";
import { setCookie } from "nookies";

const Login: React.FC<{}> = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    // Already authenticated
    Router.push("/me");
    return <></>;
  }

  const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    Axios.post<LoginResponse>(backendUrl("auth/login"), { email, password }).then((data) => {
      const { user: userInfo, accessToken } = data.data;
      setUser(userInfo);
      // Set cookies
      setCookie(null, "jwtToken", accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });

      Axios.defaults.headers["Authorization"] = "Bearer " + accessToken;
    });
  };

  return (
    <section className="h-full flex justify-center items-center">
      <form onSubmit={handleLogin}>
        <div className={styles.formfield}>
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className={styles.formfield}>
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className={styles.formfield}>
          <button type="submit" className="px-4 py-2 bg-slate-300 w-max rounded-md">
            Log in
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
