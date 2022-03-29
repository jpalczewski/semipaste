import graphql from "babel-plugin-relay/macro";

export const addPasteBin = graphql`
  mutation addPasteBinMutation(
    $exposure: Boolean
    $text: String = ""
    $title: String = ""
  ) {
    addPasteBin(exposure: $exposure, text: $text, title: $title) {
      ok
    }
  }
`;
