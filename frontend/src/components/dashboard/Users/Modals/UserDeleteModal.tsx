import {useEffect, useState} from "react";
import {Button, Modal, Alert} from "react-bootstrap";
import {commitMutation} from "react-relay";
import {deleteUserMutation} from "../../../../Query/Users/__generated__/deleteUserMutation.graphql";
import RelayEnvironment from "../../../../RelayEnvironment";
import {deleteUser} from "../../../../Query/Users/deleteUser";

export const UserDeleteModal = (props: any) => {
    const [show, setShow] = useState(false);
    const [result, setResult] = useState("");

    const handleDeleteUser = () => {
      commitMutation<deleteUserMutation>(RelayEnvironment, {
        mutation: deleteUser,
        variables: {input: props.id},
        onCompleted: response => {
          if (response.deleteUser?.ok) {
            setResult("Deleted");
            const timer = setTimeout(() => {
              setShow(!show);
              window.location.reload();
              }, 500);
            return () => clearTimeout(timer);
          }
          setResult(`Something went wrong: ${response.deleteUser?.error}`);
        },
        onError: error => {
          setResult(`Error: ${error}`);
        }
      });
  }

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult("");
        }, 1500);
        return () => clearTimeout(timer);
    }, [result]);

    return (
        <>
      <Button variant="danger" onClick={() => setShow(!show)}>
        Delete
      </Button>

      <Modal show={show} onHide={() => setShow(!show)} backdrop>
        <Modal.Header closeButton>
          <Modal.Title>Deleting: {props.username}</Modal.Title>
        </Modal.Header>
        {
          result !== "" &&
            <div>
              <Alert variant="primary">
                <Alert.Heading>
                  {result}
                </Alert.Heading>
              </Alert>
            </div>
        }
        <Modal.Body>
          Are you sure you want to delete this paste [{props.id}]?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}
