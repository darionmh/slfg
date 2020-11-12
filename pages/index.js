import Head from 'next/head';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import GameList from '../components/gameList';
import GroupOptions from '../components/groupOptions';
import styles from '../styles/Home.module.css';

export default function Home() {

  const [activeGame, setActiveGame] = useState(null);
  const [groupOptions, setGroupOptions] = useState(null);

  return (
    <div className={styles.container}>
      <Head>
        <title>Still looking for a group</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container>
          <h1>SLFG - Still Looking For A Group</h1>
          <h3>LFG utility for all platforms</h3>
          <div style={{ height: '30px' }}></div>
        </Container>

        <GameList setActiveGame={setActiveGame} activeGame={activeGame}></GameList>
        <div style={{ height: '30px' }}></div>
        <GroupOptions activeGame={activeGame}></GroupOptions>
      </main>

      <footer className={styles.footer}>
        <div>
          <a href="https://www.buymeacoffee.com/slfg">
            Like the website? You can support me and future updates with coffee. 😊
        </a>
        </div>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </div>
      </footer>
    </div>
  )
}