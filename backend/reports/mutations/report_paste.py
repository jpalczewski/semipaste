# Standard Library
import logging

# 3rd-Party
import graphene
from graphene import relay

# Project
from backend.mixins import ResultMixin
from pastes.models import PasteBin

logger = logging.getLogger(__name__)


class ReportPaste(ResultMixin, relay.ClientIDMutation):
    class Input:
        pid = graphene.ID(required=True)
        reason = graphene.String(required=True)

    def mutate_and_get_payload(root, info, pid, reason, *kwargs):  # type: ignore
        """Method which handles reporting a paste violating rules.

        Reporting user needs to be logged in

        Args:
            pid: id of a paste that will be reported
            reason: Reason why that paste break the rules.

        Returns:

        """
        logger.debug("entered report_paste")
        if info.context.user.is_anonymous:
            return ReportPaste(ok=False, error="You need to be logged in")

        try:
            reported_paste = PasteBin.objects.get(pk=pid)
            reported_paste.reports.create(author=info.context.user, reason=reason)

        except PasteBin.DoesNotExist:
            return ReportPaste(ok=False, error="Reported paste not found")
        except Exception as e:
            return ReportPaste(ok=False, error=str(e))

        return ReportPaste(ok=True)
