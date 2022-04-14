import graphql from "babel-plugin-relay/macro";

export const login = graphql`
  mutation loginMutation($username: String!, $password: String!) {
    tokenAuth(input: { username: $username, password: $password }) {
      token
    }
  }
`;
