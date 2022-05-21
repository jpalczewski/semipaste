import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {commitMutation, useLazyLoadQuery} from "react-relay";
import {highlightPasteBinMutation} from "../../Query/SyntaxHighlight/__generated__/highlightPasteBinMutation.graphql";
import RelayEnvironment from "../../RelayEnvironment";
import {highlightPasteBin} from "../../Query/SyntaxHighlight/highlightPasteBin";
import {useParams} from "react-router-dom";
import {getPasteBinQuery} from "../../Query/PasteBins/__generated__/getPasteBinQuery.graphql";
import {getPasteBin} from "../../Query/PasteBins/getPasteBin";
import {Wrapper} from "../../styles/Components.style";

export const PasteScreen = () => {
    const [syntax, setSyntax] = useState<string>("");
    const { pk } = useParams();
    const paste = useLazyLoadQuery<getPasteBinQuery>(getPasteBin, {id: pk!});

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

    return (
        <Wrapper style={{textAlign: "left"}}>
            <div className="container-fluid p-3" style={{height: "100vh"}}>
            <div className="container bg-white p-4">
            <div className="row mb-3">
                <div className="col">
                    <h2>{paste.allPasteBin?.edges?.[0]?.node?.title}</h2>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col">
                    <pre>Author: {paste.allPasteBin?.edges?.[0]?.node?.author?.username}</pre>
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
        </div>
        </div>
        </Wrapper>
    )
}
