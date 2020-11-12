import { useState } from 'react';
import { Card, Container } from 'react-bootstrap';

export default function GameList({activeGame, setActiveGame}) {
    const [isLoaded, setIsLoaded] = useState(true);
    const [games, setGames] = useState(
        [
            { title: 'Assassin\'s Creed Odyssey' },
            { title: 'Assassin\'s Creed Valhalla' },
            { title: 'Baldur\'s Gate 3' },
            { title: 'Borderlands 3' },
            { title: 'Crayta' },
            { title: 'Dead by Daylight' },
            { title: 'Destiny 2' },
            { title: 'Farming Simulator' },
            { title: 'Get Packed' },
            { title: 'GRID' },
            { title: 'Marvel\'s Avengers' },
            { title: 'Mortal Kombat 11' },
            { title: 'RDR2' },
            { title: 'The Crew 2' },
        ]);

    // useEffect(() => {

    // });

    return (
        <Container>
            <h2>What are we playing today?</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                {
                    games.map(g => (
                        <GameCard title={g.title} onClick={() => setActiveGame(activeGame === g ? null : g)} isActive={g === activeGame}></GameCard>
                    ))
                }
                <div className="spacer" style={{ flex: "auto" }}></div>
            </div>
        </Container>
    )
}

function GameCard({ title, onClick, isActive }) {
    return (
        <Card style={{ marginLeft: "5px", marginRight: "5px", marginBottom: "10px" }} className={isActive ? 'card--active' : ''} onClick={onClick}>
            <Card.Body>
                {title}
            </Card.Body>
        </Card>
    )
}