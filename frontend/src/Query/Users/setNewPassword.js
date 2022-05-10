import graphql from "babel-plugin-relay/macro";

export const setNewPassword = graphql`
  mutation setNewPasswordMutation($email: String!, $code: String!, $newPassword: String!, $confirmNewPassword: String!) {
      setNewPassword(input: {email: $email, code: $code, newPassword: $newPassword, confirmNewPassword: $confirmNewPassword}) {
          ok
          response
      }
  }
`;
