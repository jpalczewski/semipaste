# Standard Library
import logging

# Django
from django.contrib.contenttypes.models import ContentType

# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType

# Project
from pastes.models import PasteBin
from pastes.queries import PasteBinNode
from reports.models import Report

logger = logging.getLogger(__name__)


class PasteReportType(DjangoObjectType):
    class Meta:
        model = Report
        fields = ('reason', 'author')
        filter_fields = ['id']
        interfaces = (relay.Node,)

    paste = graphene.Field(PasteBinNode)

    def resolve_paste(self, info):  # type: ignore
        return PasteBin.objects.filter(pk=self.object_id).last()

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        if not info.context.user.is_superuser:
            logger.warning("Paste reports without privileges requested")
            return queryset.none()
        pastebin_model_id = ContentType.objects.get_for_model(PasteBin).id
        return queryset.filter(content_type_id=pastebin_model_id)
