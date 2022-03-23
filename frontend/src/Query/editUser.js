import graphql from "babel-plugin-relay/macro";

export const editUser = graphql`
  mutation editUserMutation($input: EditInput) {
    editUser(input: $input) {
      id
      username
      lastName
      firstName
      email
    }
  }
`;
