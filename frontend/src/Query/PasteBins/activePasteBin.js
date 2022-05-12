import graphql from "babel-plugin-relay/macro";

export const activePasteBin = graphql`
  query activePasteBinQuery($mode: String, $time: String, $first: Int, $offset: Int) {
    activePasteBin(mode: $mode, time: $time, first: $first, offset: $offset) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
      edges {
        node {
          title
          text
          dateOfCreation
          id
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

// GRAPHIQL
// {
//   activePasteBin {
//     edges {
//       node {
//         title
//         text
//         dateOfExpiry
//         id
//         dateOfCreation
//         visible
//         expireAfter

//       }
//     }
//   }
// }
