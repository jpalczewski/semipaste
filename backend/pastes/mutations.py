"""Pastes schema."""


# Standard Library
import logging

# Django
from django.db import transaction

# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

# Local
from .models import PasteBin

logger = logging.getLogger(__file__)


class ErrorCode(graphene.Enum):
    NONEXISTENTPASTE = 1
    NOTLOGGEDIN = 2
    PERMISSIONDENIED = 3
    OPERATIONFAILED = 4

    @property
    def description(self) -> str:
        match (self):
            case self.NONEXISTENTPASTE:
                return "Requested paste just doesn't exist"
            case self.NOTLOGGEDIN:
                return "User should be logged in to do that operation"
            case self.PERMISSIONDENIED:
                return "Lack of permissions"


class ResultMixin:
    ok = graphene.Boolean(default_value=True, description="Mutation result")
    error = graphene.String(default_value=None, description="Error string")
    error_code = graphene.Field(ErrorCode, description="Numeric error code")


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


class DeletePasteBin(ResultMixin, graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    @transaction.atomic
    def mutate(cls, info, id, **kwargs):  # type: ignore
        logger.debug("Delete entered")
        try:
            paste: PasteBin = PasteBin.objects.get(pk=id)
        except PasteBin.DoesNotExist:
            logger.debug("not existing paste deletion requested")
            return DeletePasteBin(
                ok=False,
                error="Requested passte doesn't exist",
                error_code=ErrorCode.NONEXISTENTPASTE,
            )

        if not info.context.user.is_authenticated:
            return DeletePasteBin(
                ok=False,
                error="You need to be logged in ",
                error_code=ErrorCode.NONEXISTENTPASTE,
            )

        if info.context.user.is_superuser:
            paste.delete()
            return DeletePasteBin(ok=True)

        if paste.author != info.context.user:
            return DeletePasteBin(
                ok=False,
                error="You cant delete paste that you don't own",
                error_code=ErrorCode.PERMISSIONDENIED,
            )

        logger.debug("trying to delete")
        paste.delete()

        return DeletePasteBin(ok=True)


class PasteBinMutation(graphene.ObjectType):
    add_paste_bin = AddPasteBin.Field()
    delete_paste_bin = DeletePasteBin.Field(
        description="Mutacja that is responsible for deleting pastes"
    )


class PasteBinQuery(graphene.ObjectType):
    all_paste_bin = DjangoFilterConnectionField(PasteBinNode)
    paste_bin = relay.Node.Field(PasteBinNode)
