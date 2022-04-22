# 3rd-Party
import graphene

# Project
from users.models import UserVerification


class VerifyNewUser(graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Arguments:
        id = graphene.ID()
        code = graphene.String()

    @staticmethod
    def mutate(root, info, **kwargs):  # type: ignore
        code = kwargs.get('code')
        user = int(kwargs.get('id'))
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
