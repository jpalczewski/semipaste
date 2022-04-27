# Django

# 3rd-Party
import graphene

# Project
from backend.mixins import ResultMixin
from pastes.models import MTMTags, PasteBin, PasteTag


class EditPasteBin(ResultMixin, graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        text = graphene.String()
        exposure = graphene.Boolean()
        tags = graphene.List(graphene.String)

    @staticmethod
    def mutate(cls, info, id, **kwargs):  # type: ignore
        user = info.context.user
        try:
            paste = PasteBin.objects.get(pk=id)
        except paste.DoesNotExist:
            return EditPasteBin(ok=False, error="No such paste")
        if user.id != paste.author_id or user.is_superuser:
            return EditPasteBin(ok=False, error="Not your paste")
        MTMTags.objects.filter(paste_id=paste.id).delete()
        for attr, val in kwargs.items():
            if val != '':
                if attr == 'tags':
                    for tag in val:
                        tag_get = PasteTag.objects.get_or_create(tag_name=tag)
                        MTMTags(paste_id=paste.id, tag_id=tag_get.id).save()
                else:
                    setattr(paste, attr, val)
        paste.save()
        return EditPasteBin(ok=True, error="Paste changed")
