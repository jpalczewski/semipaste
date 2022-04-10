# Standard Library
import random
import string

# 3rd-Party
import graphene

# Project
from users.models import User, UserVerification


class SendNewPasswordToken(graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Arguments:
        email = graphene.String()

    @staticmethod
    def mutate(root, info, **kwargs):  # type: ignore

        email = kwargs.get('email')
        if User.objects.get(email=email):
            user = User.objects.get(email=email)
            code = "".join(random.choice(string.ascii_letters) for i in range(10))
            verification = UserVerification(
                user=user, verification_code=code, code_type="password"
            )
            verification.save()
            user.email_user(
                subject="Password recovery",
                message="Here's your confirmation code: " + code,
                fail_silently=None,
            )
            return SendNewPasswordToken(
                ok=True, response="Sending massage to your email!"
            )
        else:
            return SendNewPasswordToken(ok=False, response="No such email.")
