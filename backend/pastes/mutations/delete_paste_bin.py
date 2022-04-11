# Standard Library


# Standard Library
import logging

# Django
from django.db import transaction

# 3rd-Party
import graphene

# Project
from backend.mixins import ErrorCode, ResultMixin
from pastes.models import PasteBin

logger = logging.getLogger(__name__)


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
                error="Requested paste doesn't exist",
                error_code=ErrorCode.NON_EXISTENT_PASTE,
            )

        if not info.context.user.is_authenticated:
            return DeletePasteBin(
                ok=False,
                error="You need to be logged in",
                error_code=ErrorCode.NON_EXISTENT_PASTE,
            )

        if info.context.user.is_superuser:
            paste.delete()
            return DeletePasteBin(ok=True, error_code=ErrorCode.OK)

        if paste.author != info.context.user:
            return DeletePasteBin(
                ok=False,
                error="You can't delete paste that you don't own",
                error_code=ErrorCode.PERMISSION_DENIED,
            )

        logger.debug("trying to delete")
        paste.delete()

        return DeletePasteBin(ok=True, error_code=ErrorCode.OK)
