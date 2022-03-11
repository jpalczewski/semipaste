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

class UserMutation(DjangoModelFormMutation):
    class Meta:
        form_class = AddUserForm
        exclude = ('password',)
    ok = graphene.Boolean()


class Mutation(graphene.ObjectType):
    add_user = UserMutation.Field()
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