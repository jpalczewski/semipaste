import graphql from "babel-plugin-relay/macro";

export const getUser = graphql`
  query getUserQuery($id: ID!) {
    allUsers(id: $id) {
      edges {
        node {
          id
          username
          firstName
          lastName
          dateJoined
        }
      }
    }
  }
`;