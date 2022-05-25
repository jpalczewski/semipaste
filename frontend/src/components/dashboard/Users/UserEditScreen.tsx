import {useParams} from "react-router-dom";
import {Form} from "react-bootstrap";

export const DashboardUserEditScreen = () => {
    const {id} = useParams();

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label></Form.Label>
                </Form.Group>
            </Form>
        </>
    )
}