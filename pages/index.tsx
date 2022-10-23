import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Educators.tech</title>
        <meta name="description" content="Where technology empowers educators" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen text-slate-900">
        <section className={`${styles.hero} flex flex-col justify-center items-start`}>
          <h1 className="text-6xl my-8">Welcome to EducatorsPower.tech</h1>
          <p className="text-2xl">Where Technology Empowers Educators</p>
          <Link href="/login">
            <a className="px-8 py-4 mt-8 bg-orange-400 rounded-md inline-block">Go to App</a>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
};

export default Home;
