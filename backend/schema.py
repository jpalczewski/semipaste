import graphene
from pastes.models import PasteBin
from pastes.forms import AddPasteBinForm
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import Node
from graphene import relay
from graphene_django.debug import DjangoDebug
from graphene_django.forms.mutation import DjangoModelFormMutation


class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = ['title', 'id']
        interfaces = (relay.Node,)
    # rowid = graphene.String()
    # fields = "__all__"


class PasteBinMutation(DjangoModelFormMutation):
    class Meta:
        form_class = AddPasteBinForm
        exclude_fields = ('id',)


class Mutation(graphene.ObjectType):
    add_paste_bin = PasteBinMutation.Field()
    pass


class Query(graphene.ObjectType):
    AllPasteBin = DjangoFilterConnectionField(PasteBinNode)
    node = graphene.relay.Node.Field(PasteBinNode)
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(query=Query, mutation=Mutation)
