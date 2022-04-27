import graphql from "babel-plugin-relay/macro";

export const popularPasteBin = graphql`
query popularPasteBinQuery($mode: String!, $topFilter: String) {
  popularPasteBin(mode: $mode, topFilter: $topFilter) {
    id
    title
    text
    dateOfCreation
    visible
    dateOfExpiry
    language
    totalRating
    likes
    dislikes
    author {
      username
    }
  }
}
`;
