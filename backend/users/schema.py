import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.forms.mutation import DjangoModelFormMutation
from graphene_django.debug import DjangoDebug
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
        id = graphene.ID()
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    def mutate(cls, info, **kwargs):
        user = User.objects.get(pk=kwargs["id"])
        user.username = kwargs.get('username', user.username)
        user.first_name = kwargs.get('first_name', user.first_name)
        user.last_name = kwargs.get('last_name', user.last_name)
        user.email = kwargs.get('email', user.email)
        user.save()
        return cls(ok=True)


class DeleteUser(graphene.Mutation):
    ok = graphene.Boolean()
    class Arguments:
        id = graphene.ID()
    def mutate(cls,info, **kwargs):
        user = User.objects.get(pk=kwargs["id"])
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
    delete_user = DeleteUser.Field()