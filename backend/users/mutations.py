"""Users schema."""

# Django
from django.utils.html import escape, strip_tags

# 3rd-Party
import graphene
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
        exclude = ('password',)
        filter_fields = ['id']
        interfaces = (relay.Node,)


class AddUser(DjangoModelFormMutation):
    ok = graphene.Boolean()

    class Meta:
        form_class = AddUserForm
        exclude = ('password',)


class EditUser(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        description = graphene.String()

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
        return cls(ok=True)


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
        return cls(ok=True)


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
    all_users = DjangoFilterConnectionField(UserNode)

    node = graphene.relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")


class UserMutation(graphene.ObjectType):
    add_user = AddUser.Field()
    edit_user = EditUser.Field()
    edit_user_description = EditUserDescription.Field()
    delete_user = DeleteUser.Field()
