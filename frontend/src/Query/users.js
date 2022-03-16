// import { graphql, usePreloadedQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";

export const users = graphql`
  query usersQuery {
    allPasteBin {
      edges {
        node {
          title
          pasteText
        }
      }
    }
  }
`;
