import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Challenge your self</title>
        <meta name="description" content="Make houswork fun!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome</h1>

        <div className={styles.description}>
          Welcom to the place where homework starts to be funnier. Please sign
          up and creat you own houshold game. After signing up and creating your
          digital household. Please invite all of your household members and
          start to gamify your housework.
        </div>

        <div className={styles.grid}>
          <a href="./signup" className={styles.card}>
            <h2>Sign Up</h2>
            <p>To start playing we need some informations about you.</p>
          </a>

          <a href="./loggin" className={styles.card}>
            <h2>Logg In</h2>
            <p>
              We know everything about you, so let's start to get stuff done!
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
