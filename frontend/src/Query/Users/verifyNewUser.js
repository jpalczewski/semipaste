import graphql from "babel-plugin-relay/macro";

export const verifyNewUser = graphql`
  mutation verifyNewUserMutation($id: ID!, $code: String!){
  verifyNewUser(input: {id: $id, code: $code}) {
    ok
    response
  }
}

`;
