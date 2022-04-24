import graphql from "babel-plugin-relay/macro";


export const ratePasteBinID = graphql`
mutation ratePasteBinIDMutation($paste: ID!, $user: ID! $liked: boolean!) {
  ratePasteBinID(input: {paste: $paste, user: $user, liked: $liked}) {
    ok
    error
    }
  }
`;
