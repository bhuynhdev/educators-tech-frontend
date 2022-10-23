import axios from "axios";
import { FormEventHandler, useState } from "react";
import { LoginResponse } from "../lib/types/User";
import { Axios, backendUrl, setAxiosBearerToken } from "../lib/utils/backend";
import { useAuth } from "../src/context/auth-context";
import styles from "../styles/Login.module.scss";
import { setCookie } from "nookies";

const Register: React.FC<{}> = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCf, setPasswordCf] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    Axios.post<LoginResponse>(backendUrl("auth/register"), { email, password, passwordConfirmation: passwordCf, firstName, lastName }).then(
      (data) => {
        const { user: userInfo, accessToken } = data.data;
        setUser(userInfo);
        // Set cookies
        setCookie(null, "jwtToken", accessToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/"
        });
      }
    );
  };

  return (
    <section className="h-full flex justify-center items-center">
      <form onSubmit={handleRegister}>
        <div className={styles.formfield}>
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className={styles.formfield}>
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className={styles.formfield}>
          <label htmlFor="login-passwordcf">Password Confirmation</label>
          <input type="password" id="login-passwordcf" value={passwordCf} onChange={(e) => setPasswordCf(e.target.value)}></input>
        </div>
        <div className={styles.formfield}>
          <label htmlFor="login-fname">First name</label>
          <input type="text" id="login-fname" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
        </div>
        <div className={styles.formfield}>
          <label htmlFor="login-lname">Last name</label>
          <input type="text" id="login-lname" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
        </div>
        <div className={styles.formfield}>
          <button type="submit" className="px-4 py-2 bg-slate-300 w-max rounded-md">
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
