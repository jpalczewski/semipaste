# 3rd-Party
import graphene

# Project
from users.models import User, UserVerification


class SetNewPassword(graphene.relay.ClientIDMutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Input:
        email = graphene.String()
        code = graphene.String()
        new_password = graphene.String()
        confirm_new_password = graphene.String()

    @staticmethod
    def mutate_and_get_payload(root, info, **input):  # type: ignore

        email = input.get("email")
        code = input.get("code")
        passw = input.get("new_password")
        confirm_passw = input.get("confirm_new_password")
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
