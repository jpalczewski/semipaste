import graphql from "babel-plugin-relay/macro";

export const addUser = graphql`
  mutation addUserMutation(
    $username: String!,
    $email: String!,
    $password: String!,
    $confirmPassword: String!,
    $firstName: String,
    $lastName: String
  ) {
    addUser(input: {
      username: $username,
      email: $email,
      password: $password,
      confirmPassword: $confirmPassword
      firstName: $firstName,
      lastName: $lastName
    }) {
      ok
      response
      id
    }
  }
`;
