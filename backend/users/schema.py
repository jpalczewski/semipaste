"""Users schema."""


# Django
from django.utils.html import escape, strip_tags

# 3rd-Party
import graphene
import graphql_jwt
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.debug import DjangoDebug
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.forms.mutation import DjangoModelFormMutation

# Local
from .forms import AddUserForm
from .models import User


class UserNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = User
        filter_fields = ['id']
        interfaces = (relay.Node,)


class AddUser(DjangoModelFormMutation):
    ok = graphene.Boolean()

    class Meta:
        form_class = AddUserForm


class EditUser(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        description = graphene.String()
        password = graphene.String()

    def mutate(cls, info, **kwargs):  # type: ignore
        user = User.objects.get(pk=kwargs["id"])
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
        id = graphene.ID()
        description = graphene.String()

    def mutate(cls, info, **kwargs):  # type: ignore
        user = User.objects.get(pk=kwargs["id"])
        user.description = strip_tags(
            escape(kwargs.get('description', user.description))
        )
        user.save()
        return cls(ok=True, user=info.context.user)


class DeleteUser(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    def mutate(cls, info, **kwargs):  # type: ignore
        user = User.objects.get(pk=kwargs["id"])
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
    edit_user = EditUser.Field()
    edit_user_description = EditUserDescription.Field()
    delete_user = DeleteUser.Field()


class ObtainJSONWebTokenUser(graphql_jwt.relay.JSONWebTokenMutation):
    user = graphene.Field(UserNode)

    @classmethod
    def resolve(cls, root, info, **kwargs):  # type: ignore
        return cls(user=info.context.user)
