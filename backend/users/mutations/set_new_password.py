# 3rd-Party
import graphene

# Project
from users.models import User, UserVerification


class SetNewPassword(graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Arguments:
        email = graphene.String()
        code = graphene.String()
        new_password = graphene.String()
        confirm_new_password = graphene.String()

    @staticmethod
    def mutate(root, info, **kwargs):  # type: ignore

        email = kwargs.get("email")
        code = kwargs.get("code")
        passw = kwargs.get("new_password")
        confirm_passw = kwargs.get("confirm_new_password")
        try:
            user = User.objects.get(email=email)
            ver = UserVerification.objects.get(user_id=User.objects.get(email=email))
        except User.DoesNotExist:
            return SetNewPassword(ok=False, response="Wrong mail")
        except UserVerification.DoesNotExist:
            return SetNewPassword(ok=False, response="Wrong code")
        else:
            if ver.verification_code == code:
                if passw == confirm_passw:
                    user.set_password(passw)
                    ver.delete()
                    user.save()
                    return SetNewPassword(
                        ok=True, response="Password changed successfully"
                    )
                else:
                    return SetNewPassword(ok=False, response="Wrong confirmed password")
            else:
                return SetNewPassword(ok=False, response="Wrong code")
