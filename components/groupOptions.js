import { useState } from "react";
import { Container, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import CreateGroup from "./createGroup";
import FindGroup from "./findGroup";

export default function GroupOptions({ activeGame, onSubmit }) {
    const [value, setValue] = useState(1);
    

    return (
        <Container>
            <h2>Create a group or find one?</h2>

            <ToggleButtonGroup type="radio" value={value} onChange={setValue} name='create or find'>
                <ToggleButton value={1}>Create</ToggleButton>
                <ToggleButton value={2}>Find</ToggleButton>
            </ToggleButtonGroup>

            <br></br>
            <br></br>

            { value === 1 ? <CreateGroup activeGame={activeGame}></CreateGroup> : <FindGroup activeGame={activeGame}></FindGroup>}
        </Container>
    )
}