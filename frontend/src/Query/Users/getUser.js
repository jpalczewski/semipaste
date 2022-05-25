import graphql from "babel-plugin-relay/macro";

export const getUser = graphql`
  query getUserQuery($id: ID!) {
    allUsers(id: $id) {
      edges {
        node {
          username
          firstName
          lastName
          id
          email
          dateJoined
          isVerified
          isStaff
          isSuperuser
        }
      }
    }
  }
`;
