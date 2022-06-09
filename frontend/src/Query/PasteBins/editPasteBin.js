import graphql from "babel-plugin-relay/macro";

export const editPasteBin = graphql`
  mutation editPasteBinMutation(
      $id: ID!,
      $title: String,
      $text: String,
      $visible: Boolean,
      $expireAfter: String
  ) {
    editPaste
    (
        id: $id,
        title: $title,
        text: $text,
        visible: $visible,
        expireAfter: $expireAfter,
    ) {
      ok
      error
    }
  }
`;
