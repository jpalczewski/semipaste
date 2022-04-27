# Standard Library

# 3rd-Party
import graphene

# Project
from pastes.models import MTMTags, PasteBin, PasteTag


class EditTag(graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Input:
        tags = graphene.List(graphene.String)
        paste_id = graphene.ID(required=True)

    @staticmethod
    def mutate(root, info, **kwargs):  # type: ignore
        tags = kwargs.get('tags')
        paste_id = kwargs.get('paste_id')
        try:
            paste = PasteBin.objects.get(id=paste_id)
        except PasteBin.DoesNotExist:
            return EditTag(ok=False, response="nope, no such paste")
        else:
            if tags:
                for tag in tags:
                    try:
                        PasteTag.objects.get(tag_name=tag)
                    except PasteTag.DoesNotExist:
                        PasteTag(tag_name=tag).save()
                    finally:
                        existing_tag = PasteTag.objects.get(tag_name=tag)
                        MTMTags(paste_id=paste.id, tag_id=existing_tag.id).save()
