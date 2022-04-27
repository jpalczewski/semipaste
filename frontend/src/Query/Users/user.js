import graphql from "babel-plugin-relay/macro";

export const user = graphql`
  query userQuery($username: String = "") {
    allUsers(username: $username) {
      edges {
        node {
          username
          firstName
          lastName
          id
          email
          dateJoined
          description
          isSuperuser
          lastLogin
        }
      }
    }
  }
`;
