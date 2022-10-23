import styles from "../styles/Login.module.scss";

const Login: React.FC<{}> = () => {
  return (
    <section className="h-full flex justify-center items-center">
      <form>
        <div className={styles.formfield}>
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email"></input>
        </div>
        <div className={styles.formfield}>
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password"></input>
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
