import graphql from "babel-plugin-relay/macro";

export const editUser = graphql`
  mutation editUserMutation(
    $id: ID!
    $username: String = ""
    $lastName: String = ""
    $firstName: String = ""
    $email: String = ""
    $password: String
    $description: String = ""
  ) {
    editUser(
      input: {
        id: $id
        username: $username
        lastName: $lastName
        firstName: $firstName
        email: $email
        password: $password
        description: $description
      }
    ) {
      ok
    }
  }
`;
