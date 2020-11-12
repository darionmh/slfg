import { useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import firebase from '../firebase';
import moment from 'moment'

export default function FindGroup({ activeGame }) {
    const [platform, setPlatform] = useState('Stadia');
    const [region, setRegion] = useState('North America');
    const [language, setLanguage] = useState('English (EN)');
    const [beginnerAllowed, setBeginnerAllowed] = useState(true);
    const [averageAllowed, setAverageAllowed] = useState(true);
    const [expertAllowed, setExpertAllowed] = useState(true);

    const [groups, setGroups] = useState(null);

    const handleSubmit = (e) => {
        e?.preventDefault();
        let groups = firebase.firestore().collection('groups')
            .where('platform', '==', platform)
            .where('region', '==', region)
            .where('language', '==', language)
            .where('beginnerAllowed', '==', beginnerAllowed)
            .where('averageAllowed', '==', averageAllowed)
            .where('expertAllowed', '==', expertAllowed);

        if (activeGame && activeGame !== '') {
            groups = groups.where('game', '==', activeGame)
        }

        groups.get().then((res) => setGroups(res.docs.map(d => d.data())));
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Platform</Form.Label>
                        <Form.Control as="select" custom onChange={(e) => setPlatform(e.target.value)} value={platform}>
                            <option>Stadia</option>
                            <option>PC</option>
                            <option>Playstation</option>
                            <option>Xbox</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Region</Form.Label>
                        <Form.Control as="select" custom onChange={(e) => setRegion(e.target.value)} value={region}>
                            <option>North America</option>
                            <option>South America</option>
                            <option>Europe</option>
                            <option>Asia</option>
                            <option>Austrialia</option>
                            <option>Antartica</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Language</Form.Label>
                        <Form.Control as="select" custom onChange={(e) => setLanguage(e.target.value)} value={language}>
                            <option>English (EN)</option>
                            <option>French (FR)</option>
                            <option>German (DE)</option>
                            <option>Italian (IT)</option>
                            <option>Portuguese (PT)</option>
                            <option>Spanish (ES)</option>
                            <option>Arabic (AR)</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Label>Skill Levels</Form.Label>
                    <div className="skill-level">
                        <Button variant={beginnerAllowed ? "primary" : "outline-primary"} onClick={() => setBeginnerAllowed(!beginnerAllowed)}>Beginner</Button>
                        <Button variant={averageAllowed ? "primary" : "outline-primary"} onClick={() => setAverageAllowed(!averageAllowed)}>Average</Button>
                        <Button variant={expertAllowed ? "primary" : "outline-primary"} onClick={() => setExpertAllowed(!expertAllowed)}>Expert</Button>
                    </div>
                </Form.Group>
                <Button block type="submit">Search</Button>
            </Form>
            <div>
                {groups ? groups.length ?
                    groups.map(g => <GroupCard onDelete={() => handleSubmit()} data={g}></GroupCard>) : <p style={{ marginTop: '10px' }}>No results.</p> : null
                }
            </div>
        </div>
    )
}

function GroupCard({ data, onDelete }) {

    return (
        <Card style={{ marginTop: '15px' }}>
            <Card.Body>
                <Card.Title>{`${data.username} - ${data.description}`}</Card.Title>
                <Card.Subtitle>{`${data.game.title} - ${data.platform}`}</Card.Subtitle>
                <Card.Text>{`posted on ${moment(data.timestamp).format('MM-DD-yyyy')} at ${moment(data.timestamp).format('hh:mm a zzz')}`}</Card.Text>
                <Card.Link onClick={() => {
                    var pass = prompt("What's the password?");
                    if (pass === data.password) {
                        firebase.firestore().collection('groups')
                            .where('timestamp', '==', data.timestamp)
                            .where('description', '==', data.description)
                            .get()
                            .then((res) => {
                                res.forEach(doc => doc.ref.delete().then(() => onDelete()))
                            });
                    }
                }}>
                    delete
                </Card.Link>
            </Card.Body>
        </Card>
    )
}