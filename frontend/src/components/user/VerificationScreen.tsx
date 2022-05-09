import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

interface Props {
    id: number,
    type: string
}

export const VerificationScreen: React.FC = () => {
    const [input, setInput] = useState("");
    const [status, setStatus] = useState(false);

    // using useState => inf loop ????
    let id = undefined;
    let type = "";

    const location = useLocation();
    console.log(location);
    if (location.state !== null) {
        const state = location.state as Props;
        id = state.id;
        type = state.type;
    }

    const handleSubmit = () => {
        switch(type) {
            case "recovery": {
                return
            }
            case "registration": {
                return
            }
        }
    }

    return (
        <>
            {id === undefined ? <><p>Nope</p></> :
            <>
            {!status ? <>
            <Form.Group className="mb-3">
                <Form.Label className="my-5">Verification Code</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="test@test.pl"
                    value={input || ""}
                    onChange={(e) => {setInput(e.target.value)}}
                />
            </Form.Group>
            <Button className="my-5" onClick={() => handleSubmit()}>
                Send E-Mail
            </Button>
                </>
                :
                <>

                </>
            }
            </>}
        </>
    );
}
