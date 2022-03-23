import graphql from "babel-plugin-relay/macro";

export const addUser = grapgql`
mutation addUserMutation($input: AddInput) {
    addUser(input: $input) {
      user {
        id
        firstName
        lastName
        dateJoined
      }
    }
  }
`;
