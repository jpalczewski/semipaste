"""Users schema."""


# Standard Library
import random
import re
import string

# Django
from django.core.mail import send_mail
from django.utils.html import escape, strip_tags

# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.debug import DjangoDebug
from graphene_django.filter import DjangoFilterConnectionField

# Local
from .models import User, UserVerification


class UserNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = User
        filter_fields = ['id']
        interfaces = (relay.Node,)


#
class AddUser(graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        confirm_password = graphene.String(required=False)
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
    def username_validation(username: str) -> bool:
        return False if User.objects.filter(username=username) else True

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

        # # verify username
        if not AddUser.username_validation(username):
            return AddUser(ok=False, response="Username already exists!")
        # # verify password
        val, response = AddUser.password_validation(password)
        if not val:
            return AddUser(ok=False, response=response)
        # verify cofirm_password
        if confirm_password != password:
            return AddUser(ok=False, response="Passwords do not match!")
        # verify email
        if not AddUser.email_validation(email):
            return AddUser(ok=False, response="Invalid email!")
        # create user
        user = User(username=username, email=email, password=password)
        user.save()
        # generate code
        code = ''.join(
            [
                random.choice(
                    string.ascii_uppercase + string.ascii_lowercase + string.digits
                )
                for n in range(10)
            ]
        )
        # verification
        verification = UserVerification(user=user, code=code)
        verification.save()
        # send mail with the code
        send_mail(
            subject="Verification code",
            message=f"Your code {code}",
            from_email=None,
            recipient_list=[user.email],
            fail_silently=None,
        )
        return AddUser(ok=True, response="Account created. Check your mailbox")


class VerifyUser(graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Arguments:
        id = graphene.ID()
        code = graphene.String()

    @staticmethod
    def mutate(root, info, **kwargs):  # type: ignore
        code = kwargs.get('code')
        user = int(kwargs.get('id'))
        ver = UserVerification.objects.filter(user=user)[0]
        if ver.verify(code):
            ver.delete()
            return VerifyUser(ok=True, response="Account Activated.")
        else:
            return VerifyUser(ok=False, response="Something went wrong...")


class EditUser(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        description = graphene.String()
        password = graphene.String()

    def mutate(cls, info, id: graphene.ID, **kwargs):  # type: ignore
        # type: ignore
        user = User.objects.get(pk=id)
        for attr in kwargs.keys():
            value = kwargs.get(attr, getattr(user, attr))
            if attr == 'description':
                setattr(user, attr, strip_tags(escape(value)))
            else:
                setattr(user, attr, value)
        user.save()
        return cls(ok=True, user=info.context.user)


class EditUserDescription(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)
        description = graphene.String()

    def mutate(cls, info, id: graphene.ID, **kwargs):  # type: ignore
        user = User.objects.get(pk=id)
        user.description = strip_tags(
            escape(kwargs.get('description', user.description))
        )
        user.save()
        return cls(ok=True, user=info.context.user)


class DeleteUser(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(cls, info, id: graphene.ID, **kwargs):  # type: ignore
        user = User.objects.get(pk=id)
        user.delete()
        return cls(ok=True)


class UserQuery(graphene.ObjectType):
    user = graphene.Field(UserNode)
    id = graphene.Int(required=True)
    all_users = DjangoFilterConnectionField(UserNode)

    node = graphene.relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")

    def resolve_user(self, info, id):  # type: ignore
        return User.objects.get(id=id)


class UserMutation(graphene.ObjectType):
    add_user = AddUser.Field()
    verify_user = VerifyUser.Field()
    edit_user = EditUser.Field()
    edit_user_description = EditUserDescription.Field()
    delete_user = DeleteUser.Field()
