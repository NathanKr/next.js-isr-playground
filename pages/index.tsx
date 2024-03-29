import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: "flex", flexDirection: "column" }}>
        <Link href="/posts-re-validate">
          Click here to navigate to posts with re-validate every 10 sec
        </Link>
        <Link href="/posts-ondemand-validation">
          Click here to navigate to posts with on demand validation
        </Link>
      </main>
    </div>
  );
};

export default Home;
