import graphql from "babel-plugin-relay/macro";

export const threePopularPasteBin = graphql`
  query threePopularPasteBinQuery($author__Username: String!) {
    activePasteBin(first: 3, author_Username: $author__Username, order: ["-likes"], visible: true) {
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
