import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.forms.mutation import DjangoModelFormMutation

from .forms import AddPasteBinForm
from .models import PasteBin


class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = ['title', 'id']
        interfaces = (relay.Node,)
    # rowid = graphene.String()
    # fields = "__all__"

class AddPasteBin(DjangoModelFormMutation):
    class Meta:
        form_class = AddPasteBinForm
        exclude_fields = ('id',)

class PasteBinMutation(graphene.ObjectType):
    class Meta:
        form_class = AddPasteBinForm
        exclude_fields = ('id',)


class PasteBinQuery(graphene.ObjectType):
   all_paste_bin = DjangoFilterConnectionField(PasteBinNode)
   paste_bin = relay.Node.Field(PasteBinNode)