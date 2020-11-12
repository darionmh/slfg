import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import firebase from '../firebase';


export default function Games() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('games').get().then((res) => setGames(res.docs.map(d => d.data())));
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Still looking for a group | games</title>
            </Head>

            <main className={styles.main}>
                <Container>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr><th>Title</th></tr>
                        </thead>
                        <tbody>
                            {games.map(g => <tr>
                                <td>{g.title}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                </Container>
            </main>
        </div>
    )
}