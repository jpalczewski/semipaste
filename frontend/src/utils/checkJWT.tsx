import {commitMutation} from "react-relay";
import {verifyTokenMutation} from "../Query/JWT/__generated__/verifyTokenMutation.graphql";
import RelayEnvironment from "../RelayEnvironment";
import {verifyToken} from "../Query/JWT/verifyToken";
import Cookies from "universal-cookie";

export const checkJWT = () => {
    const cookie = new Cookies();
    commitMutation<verifyTokenMutation>(RelayEnvironment, {
        mutation: verifyToken,
        variables: {token: cookie.get("JWT")},
        onCompleted: response => {
            return response.verifyToken?.payload !== null;
        },
        onError: error => {
            return false;
        }
    });
}
