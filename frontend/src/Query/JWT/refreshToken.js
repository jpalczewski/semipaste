import graphql from "babel-plugin-relay/macro";

export const refreshToken = graphql`
  mutation refreshTokenMutation($token: String!) {
    refreshToken(input: {token: $token}) {
      token
    }
  }
`;
