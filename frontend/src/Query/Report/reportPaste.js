import graphql from "babel-plugin-relay/macro";

export const reportPaste = graphql`
  mutation reportPasteMutation($pid: ID!, $reason: String!) {
    reportPaste(input: {pid: $pid, reason: $reason}) {
      ok
      error
    }
  }
`;
