# Standard Library
import logging

# 3rd-Party
import graphene

# Project
from backend.mixins import ErrorCode, ResultMixin
from users.models import User

logger = logging.getLogger(__name__)


class DeleteUser(ResultMixin, graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    @classmethod
    def mutate(cls, root, info, id, **kwargs):  # type: ignore
        logger.debug("Enter deleteUser")
        if not info.context.user.is_superuser:
            return DeleteUser(
                ok=False,
                error_code=ErrorCode.PERMISSION_DENIED,
                error="You don't have permission to this action",
            )
        try:
            user = User.objects.get(pk=id)
        except User.DoesNotExist:
            return DeleteUser(
                ok=False,
                error_code=ErrorCode.USER_NOT_FOUND,
                error="Specified user does not exist",
            )
        except Exception as e:
            return DeleteUser(pk=False, error=str(e))
        else:
            user.delete()
            return DeleteUser(ok=True, error_code=ErrorCode.OK)
