import {useEffect, useState} from "react";
import {Button, Modal, Alert} from "react-bootstrap";
import {commitMutation} from "react-relay";
import RelayEnvironment from "../../../../RelayEnvironment";
import {deletePasteBin} from "../../../../Query/PasteBins/deletePasteBin";
import {deletePasteBinMutation} from "../../../../Query/PasteBins/__generated__/deletePasteBinMutation.graphql";

export const PasteDeleteModal = (props: any) => {
    const [show, setShow] = useState(false);
    const [result, setResult] = useState("");

    const handleDeletePaste = () => {
      commitMutation<deletePasteBinMutation>(RelayEnvironment, {
        mutation: deletePasteBin,
        variables: {id: props.id},
        onCompleted: response => {
          if (response.deletePasteBin?.ok) {
              setResult("Deleted");
              const timer = setTimeout(() => {
                  setShow(!show);
                  window.location.reload();
                  }, 500);
              return () => clearTimeout(timer);
          }
          setResult(`Something went wrong: ${response.deletePasteBin?.error}`);
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
          <Modal.Title>Deleting: {props.title}</Modal.Title>
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
          Are you sure you want to delete this user [{props.id}]?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeletePaste}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}
