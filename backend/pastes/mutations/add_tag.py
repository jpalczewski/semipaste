# Standard Library

# 3rd-Party
import graphene

# Project
from pastes.models import PasteTag


class AddTag(graphene.Mutation):
    ok = graphene.Boolean()
    response = graphene.String()

    class Input:
        tag_name = graphene.String(description="Gets the tag name")

    @staticmethod
    def mutate(root, info, **kwargs):  # type: ignore
        name = kwargs.get('tag_name')
        if name == "":
            return AddTag(ok=False, response="no name given")
        try:
            PasteTag.objects.get(tag_name=name)
            return AddTag(ok=False, response="name already exist")
        except PasteTag.DoesNotExist:
            PasteTag(tag_name=name).save()
            return AddTag(ok=True, response="tag saved")
