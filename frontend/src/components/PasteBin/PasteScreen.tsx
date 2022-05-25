import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {commitMutation, useLazyLoadQuery} from "react-relay";
import {highlightPasteBinMutation} from "../../Query/SyntaxHighlight/__generated__/highlightPasteBinMutation.graphql";
import RelayEnvironment from "../../RelayEnvironment";
import {highlightPasteBin} from "../../Query/SyntaxHighlight/highlightPasteBin";
import {useNavigate, useParams} from "react-router-dom";
import {getPasteBinQuery} from "../../Query/PasteBins/__generated__/getPasteBinQuery.graphql";
import {getPasteBin} from "../../Query/PasteBins/getPasteBin";
import {Wrapper} from "../../styles/Components.style";
import {PasteReportScreen} from "./PasteReportScreen";

export const PasteScreen = (props: any) => {
    const [syntax, setSyntax] = useState<string>("");
    const pk = props.id;
    const paste = useLazyLoadQuery<getPasteBinQuery>(getPasteBin, {id: pk!});

    const [color, setColor] = useState("black");
    const [cursor, setCursor] = useState("crosshair");

    useEffect(() => {
      commitMutation<highlightPasteBinMutation>(RelayEnvironment, {
        mutation: highlightPasteBin,
        variables: { id: pk! },
        onCompleted: (response) => {
            setSyntax(response.highlightPasteBin?.highlight!)
        },
        onError: (error) => {
            setSyntax("Error")
        },
  });
  }, []);

    const navigate = useNavigate();

    return (
        <Wrapper style={{textAlign: "left"}}>
            <div className="p-3">
            <div className="container bg-white p-4">
                <div className="mt-3 mb-5 d-flex justify-content-between">
                    <Button onClick={() => navigate("/pastes")}>Go back</Button>
                </div>
                <div></div>
                <div>

                </div>
            <div className="row mb-3">
                <div className="col">
                    <h2>{paste.allPasteBin?.edges?.[0]?.node?.title}</h2>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col">
                    <pre
                    style={{color: color, cursor: cursor}} onClick={() => navigate(`/users/${paste.allPasteBin?.edges?.[0]?.node?.author?.id}`)}
            onMouseOver={() => {
                setColor("grey");
                setCursor("pointer");
            }}
            onMouseLeave={() => {
                setColor("black");
                setCursor("crosshair");
            }}
                    >Author: {paste.allPasteBin?.edges?.[0]?.node?.author?.username}</pre>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <pre>Lanuage: {paste.allPasteBin?.edges?.[0]?.node?.language}</pre>
                </div>
            </div>
                <hr />
            <div className="row py-3">
                <div className="col-12">
                    <p>Code</p>
                </div>
                <pre dangerouslySetInnerHTML={{__html: syntax}}></pre>
            </div>
            <div className="row py-3">
                <p>Raw Code</p>
                <textarea rows={10} disabled>{paste.allPasteBin?.edges?.[0]?.node?.text}</textarea>
            </div>
                <PasteReportScreen pid={paste.allPasteBin?.edges?.[0]?.node?.id} title={paste.allPasteBin?.edges?.[0]?.node?.title}/>
            </div>
            </div>
        </Wrapper>
    )
}
