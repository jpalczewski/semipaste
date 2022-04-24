import graphql from "babel-plugin-relay/macro";

export const topPasteBin = graphql`
query topPasteBinQuery($mode: String) {
  topPasteBin(mode: $mode) {
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
