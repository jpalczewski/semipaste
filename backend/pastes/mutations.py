"""Pastes schema."""


# Standard Library
import logging

# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

# Local
from .models import PasteBin

logger = logging.getLogger('')


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
        if info.context.user.is_authenticated:
            kwargs['author'] = info.context.user
        else:
            kwargs['author'] = None
        paste = PasteBin(**kwargs)
        paste.save()
        return cls(ok=True)


class DeletePasteBin(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(cls, info, id, **kwargs):  # type: ignore

        if info.context.user.is_authenticated:
            kwargs['author'] = info.context.user
        else:
            kwargs['author'] = None
        logger.warning(info)
        logger.debug("debug")
        logger.info("aha")
        return cls(ok=True)


class PasteBinMutation(graphene.ObjectType):
    add_paste_bin = AddPasteBin.Field()
    delete_paste_bin = DeletePasteBin.Field(
        description="Mutacja usuwająca wklejkę. Albo należące do użytkownika, "
        "administrator może dowolnną."
    )


class PasteBinQuery(graphene.ObjectType):
    all_paste_bin = DjangoFilterConnectionField(PasteBinNode)
    paste_bin = relay.Node.Field(PasteBinNode)
