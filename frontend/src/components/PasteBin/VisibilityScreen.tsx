import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {PasteScreen} from "./PasteScreen";
import {useLazyLoadQuery} from "react-relay";
import {getPasteBinQuery} from "../../Query/PasteBins/__generated__/getPasteBinQuery.graphql";
import {getPasteBin} from "../../Query/PasteBins/getPasteBin";

export const VisibilityScreen = () => {

    const {id} = useParams();
    let visible = false;

    const paste = useLazyLoadQuery<getPasteBinQuery>(getPasteBin, {id: id!});
    if (paste.allPasteBin?.edges?.[0]?.node?.visible) {
        visible = true;
    }

    return (
        <>
            {
                visible
                ? <PasteScreen id={id} />
                : <h1>Paste not found!</h1>
            }
        </>
    );
}
