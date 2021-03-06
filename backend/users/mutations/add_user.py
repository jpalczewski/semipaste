# Standard Library
import random
import re
import string

# 3rd-Party
import graphene

# Project
from users.models import User, UserVerification


class AddUser(graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        confirm_password = graphene.String(required=True)
        email = graphene.String(required=True)

    @staticmethod
    def password_validation(password: str) -> tuple[bool, str]:
        val = True
        response = "Everything is fine"

        if len(password) < 6:
            response = 'length should be at least 6'
            val = False

        if not any(char.isdigit() for char in password):
            response = 'Password should have at least one numeral'
            val = False

        if not any(char.islower() for char in password):
            response = 'Password should have at least one lowercase letter'
            val = False

        return val, response

    @staticmethod
    def email_validation(email: str) -> bool:
        regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        return True if re.search(regex, email) else False

    @staticmethod
    def mutate(root, info, **kwargs):  # type: ignore
        username = kwargs.get('username')
        password = kwargs.get('password')
        confirm_password = kwargs.get('confirm_password')
        email = kwargs.get('email')

        val, response = AddUser.password_validation(password)
        if not val:
            return AddUser(ok=False, response=response)

        if confirm_password != password:
            return AddUser(ok=False, response="Passwords do not match!")

        if not AddUser.email_validation(email):
            return AddUser(ok=False, response="Invalid email!")

        try:
            user = User(username=username, email=email)
            user.set_password(password)
            user.save()
        except Exception as e:
            return AddUser(ok=False, response=f"Failed to create user: {e}")

        code = ''.join(
            [
                random.SystemRandom().choice(
                    string.ascii_uppercase + string.ascii_lowercase + string.digits
                )
                for n in range(10)
            ]
        )

        try:
            verification = UserVerification(
                user=user, verification_code=code, code_type="token"
            )
            verification.save()
        except Exception as e:
            return AddUser(ok=False, response=f"Failed to save verification: {e}")

        try:
            user.email_user(
                subject="Verification code",
                message=f"Your verification code {code}",
                fail_silently=None,
            )
        except Exception as e:
            return AddUser(
                ok=False, response=f"Failed to send the verification code: {e}"
            )

        return AddUser(ok=True, response="Account created. Check your mailbox")
