import graphql from "babel-plugin-relay/macro";


export const ratePasteBin = graphql`
mutation ratePasteBinMutation($paste: ID!, $liked: boolean!) {
  ratePasteBin(input: {paste: $paste, liked: $liked}) {
    ok
    error
    }
  }
`;
