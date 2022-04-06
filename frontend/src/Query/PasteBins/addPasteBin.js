import graphql from "babel-plugin-relay/macro";

export const addPasteBin = graphql`
mutation addPasteBinMutation($text: String!, $title: String!, $exposure: Boolean!, $expireAfter: ExpireChoices = MIN) {
  addPasteBin(input: {text: $text, title: $title, expireAfter: $expireAfter, exposure: $exposure}) {
    ok
    addedPasteId
  }
}
`;
