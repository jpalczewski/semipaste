# 3rd-Party
import graphene

# Project
from backend.mixins import ErrorCode, ResultMixin
from users.models import User


class DeleteUser(ResultMixin, graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    @classmethod
    def mutate(cls, info, id: graphene.ID, **kwargs):  # type: ignore
        if not info.context.user.is_superuser:
            return DeleteUser(
                ok=False,
                errorcode=ErrorCode.PERMISSIONDENIED,
                error="You don't have permission to this action",
            )
        try:
            user = User.objects.get(pk=id)
        except User.DoesNotExist:
            return DeleteUser(
                ok=False,
                errorcode=ErrorCode.USERNOTFOUND,
                error="Specified user does not exist",
            )
        else:
            user.delete()
            return DeleteUser(ok=True)
