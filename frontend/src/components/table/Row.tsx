import {PasteBinPreviewScreen} from "../PasteBin/PasteBinPreviewScreen";
import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {commitMutation} from "react-relay";
import {isPasteBinRatedMutation} from "../../Query/Rating/__generated__/isPasteBinRatedMutation.graphql";
import RelayEnvironment from "../../RelayEnvironment";
import {isPasteBinRated} from "../../Query/Rating/isPasteBinRated";
import {ratePasteBinMutation} from "../../Query/Rating/__generated__/ratePasteBinMutation.graphql";
import {ratePasteBin} from "../../Query/Rating/ratePasteBin";
import {useNavigate} from "react-router-dom";

export const Row = (props: any) => {
    const [totalRating, setTotalRating] = useState(props.object?.totalRating);
    const [isRated, setIsRated] = useState<boolean>(false);
    const [rate, setRate] = useState<boolean>(false);
    const [likes, setLikes] = useState(props.object?.likes);
    const [dislikes, setDislikes] = useState(props.object?.dislikes);
    const [color, setColor] = useState("black");
    const [cursor, setCursor] = useState("crosshair");

    useEffect(() => {
        console.log("Effect");
    }, [totalRating]);

    useEffect(() => {
        commitMutation<isPasteBinRatedMutation>(RelayEnvironment, {
            mutation: isPasteBinRated,
            variables: {paste: props.object?.id},
            onCompleted: (response) => {
                setIsRated(response.isPasteBinRated?.isRated!);
                setRate(response.isPasteBinRated?.rate!);
            },
        });
    }, []);

    const refreshRated = () => {
        commitMutation<isPasteBinRatedMutation>(RelayEnvironment, {
            mutation: isPasteBinRated,
            variables: {paste: props.object?.id},
            onCompleted: (response) => {
                setIsRated(response.isPasteBinRated?.isRated!);
                setRate(response.isPasteBinRated?.rate!);
                setLikes(response.isPasteBinRated?.likes);
                setDislikes(response.isPasteBinRated?.dislikes);
                setTotalRating(response.isPasteBinRated?.totalRating);
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


    const [variantLike, setVariantLike] = useState("outline-primary");
    const [variantDislike, setVariantDislike] = useState("outline-primary");

    useEffect(() => {
        if (rate === true)  setVariantLike("primary");
        else if (rate === false) setVariantDislike("primary");
    }, [totalRating])

    const renderRate = () => {
        let rateRender = [];

        // if (rate === true)  setVariantLike("primary");
        // else if (rate === false) setVariantDislike("primary");

        rateRender.push(
            <Button variant={variantLike} value="like" onClick={handleRate}>
                        &#128402;
            </Button>
        )
        rateRender.push(
            <div>{totalRating}</div>
        )
        rateRender.push(
            <Button variant={variantDislike} value="dislike" onClick={handleRate}>
                        &#128403;
            </Button>
        )

        return rateRender;
    }

    const navigate = useNavigate();

    return (
        <tr className="align-middle">
            <td><span style={{color: color, cursor: cursor}} onClick={() => navigate(`/pastes/${props.object?.id}`)}
            onMouseOver={() => {
                setColor("grey");
                setCursor("pointer");
            }}
            onMouseLeave={() => {
                setColor("black");
                setCursor("crosshair");
            }}
            >{props.object?.title}</span></td>
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
            <td style={{width: 200}}>
                <PasteBinPreviewScreen
                    title={props.object?.title}
                    id={props.object?.id}
                    language={props.object?.language}
                    text={props.object?.text}
                    likes={likes}
                    dislikes={dislikes}
                />
                <Button className="m-2" onClick={()=>navigate(`/pastes/${props.object?.id}`)}>Open</Button>
            </td>
        </tr>
    )
}
