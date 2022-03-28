import graphql from "babel-plugin-relay/macro";

export const editUser = graphql`
  mutation editUserMutation(
    $id: ID!
    $username: String!
    $lastName: String!
    $firstName: String!
    $email: String!
  ) {
    editUser(
      id: $id
      username: $username
      lastName: $lastName
      firstName: $firstName
      email: $email
    ) {
      ok
    }
  }
`;
