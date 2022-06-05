import graphql from "babel-plugin-relay/macro";

export const deleteUser = graphql`
  mutation deleteUserMutation($input: ID!) {
    deleteUser(input: {id: $input}) {
      ok
    }
  }
`;
