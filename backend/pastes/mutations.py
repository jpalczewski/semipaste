"""Pastes schema."""


# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

# Local
from .models import PasteBin


class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = ['title', 'id']
        interfaces = (relay.Node,)

    # rowid = graphene.String()
    # fields = "__all__"


class AddPasteBin(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        title = graphene.String()
        text = graphene.String()
        expire_after = graphene.String()
        exposure = graphene.Boolean()

    def mutate(cls, info, **kwargs):  # type: ignore
        kwargs['author'] = info.context.user
        paste = PasteBin(**kwargs)
        paste.save()
        return cls(ok=True)


class PasteBinMutation(graphene.ObjectType):
    add_paste_bin = AddPasteBin.Field()


class PasteBinQuery(graphene.ObjectType):
    all_paste_bin = DjangoFilterConnectionField(PasteBinNode)
    paste_bin = relay.Node.Field(PasteBinNode)
