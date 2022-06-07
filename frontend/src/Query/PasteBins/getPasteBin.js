import graphql from "babel-plugin-relay/macro";

export const getPasteBin = graphql`
  query getPasteBinQuery($id: ID!) {
    allPasteBin(id: $id) {
      edges {
        node {
          title
          text
          dateOfCreation
          id
          visible
          dateOfExpiry
          totalRating
          language
          author {
            id
            username
          }
        }
      }
    }
  }
`;
