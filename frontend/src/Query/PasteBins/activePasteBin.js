import graphql from "babel-plugin-relay/macro";

export const activePasteBin = graphql`
  query activePasteBinQuery($mode: String, $time: String) {
    activePasteBin(mode: $mode, time: $time) {
      edges {
        node {
          title
          text
          dateOfCreation
          id
          visible
          dateOfExpiry
          language
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
