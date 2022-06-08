import graphql from "babel-plugin-relay/macro";

export const threeRecentPasteBin = graphql`
  query threeRecentPasteBinQuery($author__Username: String!) {
    activePasteBin(author_Username: $author__Username, visible: true, first: 3) {
      edges {
        node {
          title
          text
          dateOfCreation
          id
          visible
          dateOfExpiry
          language
          totalRating
          likes
          dislikes
          author {
            username
          }
        }
        }
      }
    }
`;
