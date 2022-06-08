# Standard Library
from datetime import datetime, timezone

# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType

# Project
from backend.filters import DefaultFilterClasses, PasteBinFilterFields
from pastes.models import Attachment, MTMTags, PasteBin, PasteTag


class TotalRatingNode(graphene.ObjectType):
    total_rating = graphene.Int()

    def resolve_total_rating(self, info: dict) -> int:  # type: ignore
        return self.likes - self.dislikes


class PasteBinNode(DjangoObjectType, TotalRatingNode):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = PasteBinFilterFields
        interfaces = (relay.Node,)
        exclude = ("attachment_token",)


class AttachmentNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)
    url = graphene.String()

    def resolve_url(root, info, **kwargs) -> str:  # type: ignore
        return f"http://{info.context.META['HTTP_HOST']}{root.image.url}"

    class Meta:
        model = Attachment
        interfaces = (relay.Node,)
        exclude = ("paste",)


class PasteTagNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)
    posts = graphene.List(PasteBinNode)

    class Meta:
        model = PasteTag
        interfaces = (relay.Node,)
        filter_fields = {
            'tag_name': DefaultFilterClasses.DEFAULT_TEXT.value,
        }

    def resolve_posts(self, info, **kwargs):  # type: ignore
        tag_id = MTMTags.objects.filter(tag_id=self.id)
        pastes = []
        for ids in tag_id:
            paste_bin_ids = PasteBin.objects.filter(id=ids.paste_id).last()
            pastes.append(paste_bin_ids)
        return pastes

class TotalCount(relay.Connection):
    class Meta:
        abstract = True

    total_count = graphene.Int()

    def resolve_total_count(root, info):
        return root.length
