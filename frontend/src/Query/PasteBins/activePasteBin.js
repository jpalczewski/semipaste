import graphql from "babel-plugin-relay/macro";

export const activePasteBin = graphql`
  query activePasteBinQuery($mode: String, $time: String, $first: Int, $offset: Int) {
    activePasteBin(mode: $mode, time: $time, first: $first, offset: $offset) {
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
