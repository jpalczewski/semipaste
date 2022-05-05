# Django

# 3rd-Party
import graphene

# Project
from backend.mixins import ResultMixin
from pastes.models import MTMTags, PasteTag


class DeleteTag(ResultMixin, graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Input:
        tag_name = graphene.String()

    def mutate(root, info, **kwargs):  # type: ignore
        tag_name = kwargs.get("tag_name")
        try:
            tag = PasteTag.objects.get(tag_name=tag_name)
            MTMTags.objects.filter(tag_id=tag.id).delete()
            tag.delete()
            return DeleteTag(ok=True, response="All done")
        except PasteTag.DoesNotExist:
            return DeleteTag(ok=False, response="No such tag")
