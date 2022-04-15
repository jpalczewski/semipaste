# Django

# 3rd-Party
import graphene

# Project
from backend.mixins import ResultMixin
from pastes.models import PasteBin


class EditPasteBin(ResultMixin, graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        text = graphene.String()
        exposure = graphene.Boolean()

    @staticmethod
    def mutate(cls, info, id, **kwargs):  # type: ignore
        user = info.context.user
        try:
            paste = PasteBin.objects.get(pk=id)
        except paste.DoesNotExist:
            return EditPasteBin(ok=False, error="No such paste")

        if user.id != paste.author_id or user.is_superuser:
            return EditPasteBin(ok=False, error="Not your paste")
        for attr, val in kwargs.items():
            if val != '':
                if attr == 'text':
                    setattr(paste, attr, val)
                elif attr == 'title':
                    setattr(paste, attr, val)
                elif attr == 'exposure':
                    setattr(paste, attr, val)
        paste.save()
        return EditPasteBin(ok=True, error="Paste changed")
