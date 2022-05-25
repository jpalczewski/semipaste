import graphql from "babel-plugin-relay/macro";

export const editUser = graphql`
  mutation editUserMutation(
    $id: ID!
    $username: String = null
    $lastName: String = null
    $firstName: String = null
    $email: String = null
    $password: String
    $description: String = null
  ) {
    editUser(
      id: $id
      username: $username
      lastName: $lastName
      firstName: $firstName
      email: $email
      password: $password
      description: $description
    ) {
      ok
    }
  }
`;
