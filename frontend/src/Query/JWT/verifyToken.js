import graphql from "babel-plugin-relay/macro";

export const verifyToken = graphql`
  mutation verifyTokenMutation($token: String!) {
     verifyToken(input: {token: $token}) {
       payload
     }
  }
`;
