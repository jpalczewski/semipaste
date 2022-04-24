import graphql from "babel-plugin-relay/macro";


export const ratePasteBinID = graphql`
mutation ratePasteBinMutation($paste: ID!, $user: ID! $liked: boolean!) {
  ratePasteBin(input: {paste: $paste, user: $user, liked: $liked}) {
    ok
    error
    }
  }
`;