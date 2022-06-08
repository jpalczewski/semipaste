import graphql from "babel-plugin-relay/macro";

export const addAttachment = graphql`
  mutation addAttachmentMutation($token: String!) {
     addAttachment(input: {token: $token}) {
       ok
       error
     }
  }
`;
