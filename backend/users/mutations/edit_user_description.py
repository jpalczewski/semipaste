# Django
from django.utils.html import escape, strip_tags

# 3rd-Party
import graphene

# Project
from users.models import User


class EditUserDescription(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)
        description = graphene.String()

    def mutate(cls, info, id: graphene.ID, **kwargs):  # type: ignore
        user = User.objects.get(pk=id)
        user.description = strip_tags(
            escape(kwargs.get('description', user.description))
        )
        user.save()
        return cls(ok=True, user=info.context.user)
