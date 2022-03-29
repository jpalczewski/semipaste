import graphql from "babel-plugin-relay/macro";

export const allPasteBin = graphql`
  query allPasteBinQuery {
    allPasteBin {
      edges {
        node {
          title
          text
          dateOfCreation
          id
          exposure
          dateOfExpiry
        }
      }
    }
  }
`;
