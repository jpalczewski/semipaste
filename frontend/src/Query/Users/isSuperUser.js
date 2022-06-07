import graphql from "babel-plugin-relay/macro";

export const isSuperUser = graphql`
  query isSuperUserQuery($id: ID, $username: String) {
    allUsers(id: $id, username: $username) {
      edges {
        node {
          isSuperuser
        }
      }
    }
  }
`;
