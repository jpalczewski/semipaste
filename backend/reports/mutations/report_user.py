# Standard Library
import logging

# 3rd-Party
import graphene
from graphene import relay

# Project
from backend.mixins import ResultMixin
from users.models import User

logger = logging.getLogger(__name__)


class ReportUser(ResultMixin, relay.ClientIDMutation):
    class Input:
        uid = graphene.ID(required=True)
        reason = graphene.String(required=True)

    def mutate_and_get_payload(cls, info, uid, reason):  # type: ignore
        logger.debug("entered report_user")
        try:
            reported_user = User.objects.get(pk=uid)
            reported_user.reports.create(author=info.context.user, reason=reason)

        except User.DoesNotExist:
            return ReportUser(ok=False, error="Reported user not found")

        return ReportUser(ok=True, error="rly")
