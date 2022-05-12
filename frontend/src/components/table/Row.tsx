import {PasteBinScreen} from "../PasteBin/PasteBinScreen";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {commitMutation} from "react-relay";
import {isPasteBinRatedMutation} from "../../Query/Rating/__generated__/isPasteBinRatedMutation.graphql";
import RelayEnvironment from "../../RelayEnvironment";
import {isPasteBinRated} from "../../Query/Rating/isPasteBinRated";
import {ratePasteBinMutation} from "../../Query/Rating/__generated__/ratePasteBinMutation.graphql";
import {ratePasteBin} from "../../Query/Rating/ratePasteBin";

export const Row = (props: any) => {
      const [totalRating, setTotalRating] = useState(props.object?.totalRating);
      const [isRated, setIsRated] = useState<boolean>(false);
      const [rate, setRate] = useState<boolean>(false);
      const [likes, setLikes] = useState(props.object?.likes);
      const [dislikes, setDislikes] = useState(props.object?.dislikes);

      useEffect(() => {
        commitMutation<isPasteBinRatedMutation>(RelayEnvironment, {
            mutation: isPasteBinRated,
            variables: { paste: props.object?.id },
            onCompleted: (response) => {
                setIsRated(response.isPasteBinRated?.isRated!);
                setRate(response.isPasteBinRated?.rate!);
            },
        });
      }, []);

      const refreshRated = () => {
      commitMutation<isPasteBinRatedMutation>(RelayEnvironment, {
        mutation: isPasteBinRated,
        variables: { paste: props.object?.id },
        onCompleted: (response) => {
            setIsRated(response.isPasteBinRated?.isRated!);
            setRate(response.isPasteBinRated?.rate!);
            setLikes(response.isPasteBinRated?.likes);
            setDislikes(response.isPasteBinRated?.dislikes);
        },
    });
  };

  const ratePaste = (value: any) => {
      commitMutation<ratePasteBinMutation>(RelayEnvironment, {
         mutation: ratePasteBin,
         variables: {paste: props.object?.id, liked: value},
         onCompleted: (response) => {
             if (response.ratePasteBin?.ok!) {
                 refreshRated()
             }
         }
      });
  }

  const handleRate = (event: any) => {
      let value = event.target.value === "like";
      if (isRated) {
          if (value === rate) {
              ratePaste(null);
          } else {
              ratePaste(value);
          }
      } else {
          ratePaste(value);
      }
  };

    return (
        <tr className="align-middle">
              <td>{props.object?.id}</td>
              <td>{props.object?.title}</td>
              <td>{props.object?.author?.username}</td>
              <td>
                {props.object?.dateOfCreation.slice(
                  0,
                  10
                )}
              </td>
              <td>
                {props.object?.dateOfExpiry.slice(0, 10)}
              </td>
              <td>
                {props.object?.totalRating}
              </td>
              <td>
                {isRated
                  ? rate &&
                  <><Button variant="primary" value="like" onClick={handleRate}>
                      &#128402;
                  </Button>
                  <Button variant="outline-primary" value="dislike" onClick={handleRate}>
                      &#128403;
                  </Button></>
                  :
                  <Button variant="outline-primary" value="like" onClick={handleRate}>
                      &#128402;
                  </Button>
              }
              {isRated
                  ? !rate &&
                  <><Button variant="outline-primary" value="like" onClick={handleRate}>
                      &#128402;
                  </Button>
                  <Button variant="primary" value="dislike" onClick={handleRate}>
                      &#128403;
                  </Button></>
                  :
                  <Button variant="outline-primary" value="dislike" onClick={handleRate}>
                      &#128403;
                  </Button>
              }
              </td>
              <td style={{ width: 200 }}>
                <PasteBinScreen
                  title={props.object?.title}
                  id={props.object?.id}
                  language={props.object?.language}
                  text={props.object?.text}
                  likes={likes}
                  dislikes={dislikes}
                />
              </td>
            </tr>
    )
}
