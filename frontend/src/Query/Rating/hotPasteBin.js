import graphql from "babel-plugin-relay/macro";

export const hotPasteBin = graphql`
query hotPasteBinQuery {
  hotPasteBin {
    id
    title
    text
    dateOfCreation
    visible
    dateOfExpiry
    language
    totalRating
  }
}
`;
