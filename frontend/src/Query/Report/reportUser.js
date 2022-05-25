import graphql from "babel-plugin-relay/macro";

export const reportUser = graphql`
  mutation reportUserMutation($uid: ID!, $reason: String!) {
    reportUser(input: {uid: $uid, reason: $reason}) {
      ok
      error
    }
  }
`;
