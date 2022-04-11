import graphql from "babel-plugin-relay/macro";

export const addPasteBin = graphql`
mutation addPasteBinMutation($text: String!, $title: String!, $visible: Boolean!, $expireAfter: ExpireChoices = DAY, $language: String) {
  addPasteBin(input: {text: $text, title: $title, expireAfter: $expireAfter, visible: $visible, language: $language}) {
    ok
    addedPasteId
  }
}
`;
