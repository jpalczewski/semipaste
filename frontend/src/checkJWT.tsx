import {commitMutation} from "react-relay";
import {verifyTokenMutation} from "./Query/JWT/__generated__/verifyTokenMutation.graphql";
import RelayEnvironment from "./RelayEnvironment";
import {verifyToken} from "./Query/JWT/verifyToken";


export const checkJWT = () => {
    // commitMutation<verifyTokenMutation>(RelayEnvironment, {
    //     mutation: verifyToken,
    //     variables: {token: token},
    //     onCompleted: response => {
    //
    //     }
    // });
}