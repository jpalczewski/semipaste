# Django
from django.utils.html import escape, strip_tags

# 3rd-Party
import graphene

# Project
from users.models import User


class EditUserDescription(graphene.relay.ClientIDMutation):
    ok = graphene.Boolean()

    class Input:
        id = graphene.ID(required=True)
        description = graphene.String()

    def mutate_and_get_payload(cls, info, id: graphene.ID, **input):  # type: ignore
        user = User.objects.get(pk=id)
        user.description = strip_tags(
            escape(input.get('description', user.description))
        )
        user.save()
        return cls(ok=True, user=info.context.user)
