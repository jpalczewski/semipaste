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
          exposure
          dateOfExpiry
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
//         exposure
//         expireAfter

//       }
//     }
//   }
// }
