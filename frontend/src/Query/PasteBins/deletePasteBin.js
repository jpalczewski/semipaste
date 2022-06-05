import graphql from "babel-plugin-relay/macro";

export const deletePasteBin = graphql`
  mutation deletePasteBinMutation($id: ID!) {
    deletePasteBin(id: $id) {
      ok
      error
    }
  }
`;
