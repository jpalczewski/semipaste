import graphql from "babel-plugin-relay/macro";

export const deleteUser = graphql`
  mutation deleteUserMutation($input: DelInput) {
    deleteUser(input: $input) {
      id
    }
  }
`;
