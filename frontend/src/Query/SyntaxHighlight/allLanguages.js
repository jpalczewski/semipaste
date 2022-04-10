import graphql from "babel-plugin-relay/macro";

export const Languages = graphql`
  query allLanguagesQuery {
        allLanguages
    }
`;
