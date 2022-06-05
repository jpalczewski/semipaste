# 3rd-Party
import graphene

# Project
from users.models import UserVerification


class VerifyNewUser(graphene.relay.ClientIDMutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Input:
        id = graphene.ID()
        code = graphene.String()

    @staticmethod
    def mutate_and_get_payload(root, info, **input):  # type: ignore
        code = input.get('code')
        user = int(input.get('id'))
        try:
            ver = UserVerification.objects.get(user=user)
        except Exception as e:
            return VerifyNewUser(ok=False, response=f"Verification doesn't exist: {e}")
        ok, response = ver.verify(code, "token")
        if ok:
            ver.delete()
            return VerifyNewUser(ok=True, response="Account Activated.")
        else:
            return VerifyNewUser(ok=False, response=f"{response}")
