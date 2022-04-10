# 3rd-Party
import graphene

# Local
from .add_user import AddUser
from .delete_user import DeleteUser
from .edit_user import EditUser
from .edit_user_description import EditUserDescription
from .send_new_password_token import SendNewPasswordToken
from .set_new_password import SetNewPassword
from .verify_new_user import VerifyNewUser


class UserMutation(graphene.ObjectType):
    add_user = AddUser.Field()
    edit_user = EditUser.Field()
    edit_user_description = EditUserDescription.Field()
    delete_user = DeleteUser.Field()
    send_new_password_token = SendNewPasswordToken.Field()
    set_new_password = SetNewPassword.Field()
    verify_new_user = VerifyNewUser.Field()
