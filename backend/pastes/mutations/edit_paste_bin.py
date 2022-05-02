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
        print("dupa")
        for attr, val in kwargs.items():
            print(attr, "----------------")
            if attr == 'tags':
                print("dupa tags")
                tag_values = kwargs.get('tags')
                if tag_values:
                    for tag in tag_values:
                        print(tag, "======================")
                        tag_get, is_created = PasteTag.objects.get_or_create(
                            tag_name=tag
                        )
                        print("dupas", paste.id, "tag_get.id")
                        print("dupa GETORCREATE", tag_get)

                        MTMTags(paste_id=paste.id, tag_id=tag_get.id).save()
                        print("dupakoniec")
            else:
                print("dupax", val)
                if val != '':
                    setattr(paste, attr, val)
        paste.save()
        return EditPasteBin(ok=True, error="Paste changed")
