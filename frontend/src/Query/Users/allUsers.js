import graphql from "babel-plugin-relay/macro";

export const allUsers = graphql`
  query allUsersQuery {
    allUsers {
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
