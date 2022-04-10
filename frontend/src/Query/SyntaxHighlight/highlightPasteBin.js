import graphql from "babel-plugin-relay/macro";

export const highlightPasteBin = graphql`
  mutation highlightPasteBinMutation($id: ID!) {
    highlightPasteBin(input: {id: $id}) {
      highlight
    }
  }
`;
