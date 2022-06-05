import graphql from "babel-plugin-relay/macro";

export const passwordRecovery = graphql`
  mutation passwordRecoveryMutation($email: String!) {
      sendNewPasswordToken(input: {email: $email}) {
          ok
          response
      }
  }
`;
