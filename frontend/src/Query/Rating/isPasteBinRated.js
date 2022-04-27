import graphql from "babel-plugin-relay/macro";


export const isPasteBinRated = graphql`
  mutation isPasteBinRatedMutation($paste: ID!) {
    isPasteBinRated(input: {paste: $paste}) {
      ok
      error
      rate
      isRated
      likes
      dislikes
      }
    }
  `
;
