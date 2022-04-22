import graphql from "babel-plugin-relay/macro";

export const activePasteBin = graphql`
  query activePasteBinQuery {
    activePasteBin {
      edges {
        node {
          title
          text
          dateOfCreation
          id
          visible
          dateOfExpiry
          language
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
