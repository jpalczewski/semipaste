import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import Node
from graphene import relay
from graphene_django.debug import DjangoDebug
from graphene_django.forms.mutation import DjangoModelFormMutation

from pastes.models import PasteBin
from users.models import User
from users.forms import AddUserForm

#NODES------------------------------------

class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)
    class Meta:
        model = PasteBin
        filter_fields = ['title','id']
        interfaces = (relay.Node,)
    #rowid = graphene.String()
        #fields = "__all__"

class UserNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)
    class Meta:
        model = User
        exclude = ('password',)
        filter_fields = ['id']
        interfaces = (relay.Node,)

#MUTAIONS------------------------------------


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

class Mutation(graphene.ObjectType):
    add_user = AddUser.Field()
    edit_user = EditUser.Field()
    delete_user = DeleteUser.Field()

    pass

#    def mutate(root, info, name):
#       user = UserNode(username=name)
#       ok = True
#       return CreateUser(user=user, ok=ok)


#class Mutations(graphene.ObjectType):
#    create_user = CreateUser.Field()
#QUERY------------------------------------

class Query(graphene.ObjectType):
    AllPasteBin = DjangoFilterConnectionField(PasteBinNode)

    user = graphene.Field(UserNode)
    AllUsers = DjangoFilterConnectionField(UserNode)
    node = graphene.relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(query=Query, mutation=Mutation)