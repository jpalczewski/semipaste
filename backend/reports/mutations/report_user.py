# 3rd-Party
import graphene
from graphene import relay
from graphql_jwt.decorators import login_required

# Project
from backend.mixins import ResultMixin


class ReportUser(ResultMixin, relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        description = graphene.String(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, **kwargs):  # type: ignore
        return ReportUser(ok=True)
