import {PasteBinPreviewScreen} from "../PasteBin/PasteBinPreviewScreen";
import React, {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";
import {commitMutation} from "react-relay";
import {isPasteBinRatedMutation} from "../../Query/Rating/__generated__/isPasteBinRatedMutation.graphql";
import RelayEnvironment from "../../RelayEnvironment";
import {isPasteBinRated} from "../../Query/Rating/isPasteBinRated";
import {ratePasteBinMutation} from "../../Query/Rating/__generated__/ratePasteBinMutation.graphql";
import {ratePasteBin} from "../../Query/Rating/ratePasteBin";
import {useNavigate} from "react-router-dom";

export const Row = (props: any) => {
    // const [isRated, setIsRated] = useState<boolean>(false);
    // const [rate, setRate] = useState<boolean>(false);
    const [likes, setLikes] = useState(props.object?.likes);
    const [dislikes, setDislikes] = useState(props.object?.dislikes);
    const [color1, setColor1] = useState("black");
    const [color2, setColor2] = useState("black");
    const [cursor1, setCursor1] = useState("crosshair");
    const [cursor2, setCursor2] = useState("crosshair");

    // useEffect(() => {
    //     commitMutation<isPasteBinRatedMutation>(RelayEnvironment, {
    //         mutation: isPasteBinRated,
    //         variables: {paste: props.object?.id},
    //         onCompleted: (response) => {
    //             setIsRated(response.isPasteBinRated?.isRated!);
    //             setRate(response.isPasteBinRated?.rate!);
    //         },
    //     });
    // }, []);

    // const refreshRated = () => {
    //     commitMutation<isPasteBinRatedMutation>(RelayEnvironment, {
    //         mutation: isPasteBinRated,
    //         variables: {paste: props.object?.id},
    //         onCompleted: (response) => {
    //             setIsRated(response.isPasteBinRated?.isRated!);
    //             setRate(response.isPasteBinRated?.rate!);
    //             setLikes(response.isPasteBinRated?.likes);
    //             setDislikes(response.isPasteBinRated?.dislikes);
    //         },
    //     });
    // };

    // const ratePaste = (value: any) => {
    //     commitMutation<ratePasteBinMutation>(RelayEnvironment, {
    //         mutation: ratePasteBin,
    //         variables: {paste: props.object?.id, liked: value},
    //         onCompleted: (response) => {
    //             if (response.ratePasteBin?.ok!) {
    //                 refreshRated()
    //             }
    //         }
    //     });
    // }

    // const handleRate = (event: any) => {
    //     let value = event.target.value === "like";
    //     if (isRated) {
    //         if (value === rate) {
    //             ratePaste(null);
    //         } else {
    //             ratePaste(value);
    //         }
    //     } else {
    //         ratePaste(value);
    //     }
    // };

    const navigate = useNavigate();

    return (
        <tr className="align-middle">
            <td
                style={{color: color1, cursor: cursor1}}
                onClick={() => navigate(`/pastes/${props.object?.id}`)}
                onMouseOver={() => {
                    setColor1("grey");
                    setCursor1("pointer");
                }}
                onMouseLeave={() => {
                    setColor1("black");
                    setCursor1("crosshair");
                }}
            >{props.object?.title}</td>
            {props.object?.author === null ? <td>Anonymous</td>
            : <td
                    style={{color: color2, cursor: cursor2}}
                    onClick={() => navigate(`/users/${props.object?.author.id}`)}
                    onMouseOver={() => {
                        setColor2("grey");
                        setCursor2("pointer");
                    }}
                    onMouseLeave={() => {
                        setColor2("black");
                        setCursor2("crosshair");
                    }}
                >{props.object?.author.username}
            </td>
            }
            <td>
                {props.object?.dateOfCreation.slice(
                    0,
                    10
                )}
            </td>
            <td>
                {props.object?.totalRating}
            </td>
            {/*<td>*/}
            {/*    {isRated*/}
            {/*        ? rate &&*/}
            {/*        <><Button variant="primary" value="like" onClick={handleRate}>*/}
            {/*            &#128402;*/}
            {/*        </Button>*/}
            {/*            <Button variant="outline-primary" value="dislike" onClick={handleRate}>*/}
            {/*                &#128403;*/}
            {/*            </Button></>*/}
            {/*        :*/}
            {/*        <Button variant="outline-primary" value="like" onClick={handleRate}>*/}
            {/*            &#128402;*/}
            {/*        </Button>*/}
            {/*    }*/}
            {/*    {isRated*/}
            {/*        ? !rate &&*/}
            {/*        <><Button variant="outline-primary" value="like" onClick={handleRate}>*/}
            {/*            &#128402;*/}
            {/*        </Button>*/}
            {/*            <Button variant="primary" value="dislike" onClick={handleRate}>*/}
            {/*                &#128403;*/}
            {/*            </Button></>*/}
            {/*        :*/}
            {/*        <Button variant="outline-primary" value="dislike" onClick={handleRate}>*/}
            {/*            &#128403;*/}
            {/*        </Button>*/}
            {/*    }*/}
            {/*</td>*/}
            <td style={{width: 200}}>
                <PasteBinPreviewScreen
                    title={props.object?.title}
                    id={props.object?.id}
                    language={props.object?.language}
                    text={props.object?.text}
                    likes={likes}
                    dislikes={dislikes}
                />
                <Button colorScheme="twitter" className="m-2" onClick={()=>navigate(`/pastes/${props.object?.id}`)}>Open</Button>
            </td>
        </tr>
    )
}
