import moment from "moment";
import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, Form, Toast, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import firebase from '../firebase'

export default function CreateGroup({ activeGame }) {
    const [platform, setPlatform] = useState('Stadia');
    const [region, setRegion] = useState('North America');
    const [language, setLanguage] = useState('English (EN)');
    const [beginnerAllowed, setBeginnerAllowed] = useState(true);
    const [averageAllowed, setAverageAllowed] = useState(true);
    const [expertAllowed, setExpertAllowed] = useState(true);
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = useState(false);
    const [posting, setPosting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPosting(true);
        setTimeout(() => {
            firebase.firestore().collection('groups').add({
                game: activeGame, platform, region, language, beginnerAllowed, averageAllowed, expertAllowed, username, description, timestamp: moment().toISOString(), password
            }).finally(() => setShow(true), setPosting(false));
        }, 500);
    }

    return (
        <div>
            <Toast onClose={() => setShow(false)} show={show} delay={10000} autohide style={{
                position: 'fixed',
                bottom: 10,
                right: 10,
                zIndex: 100
            }}>
                <Toast.Body>Request posted!</Toast.Body>
            </Toast>

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
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" placeholder="Enter your username/gamertag for the selected platform" onChange={(e) => setUsername(e.target.value)} value={username} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description/Notes</Form.Label>
                    <Form.Control required type="text" placeholder="Enter description/notes. (ex: just want to chill, need mic, add me on discord at 'name', etc..)" onChange={(e) => setDescription(e.target.value)} value={description} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password (needed to close or edit the group later)</Form.Label>
                    <Form.Control required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </Form.Group>
                <Button block type="submit" disabled={posting || !activeGame}>{posting ? 'Posting...' : 'Post Request'}</Button>
            </Form>
        </div>
    )
}