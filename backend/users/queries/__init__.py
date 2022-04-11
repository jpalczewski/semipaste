# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.debug import DjangoDebug
from graphene_django.filter import DjangoFilterConnectionField

# Project
from backend.filters import DefaultFilterClasses
from users.models import User


class UserNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = User
        filter_fields = {
            'id': ['exact'],
            'username': DefaultFilterClasses.DEFAULT_TEXT.value,
            'description': DefaultFilterClasses.DEFAULT_TEXT.value,
            'is_superuser': ['exact'],
            'first_name': DefaultFilterClasses.DEFAULT_TEXT.value,
            'last_name': DefaultFilterClasses.DEFAULT_TEXT.value,
        }
        interfaces = (relay.Node,)
        exclude = ('password', 'reports')

    def resolve_report_set(parent, info):  # type:ignore
        return []


class UserQuery(graphene.ObjectType):
    user = graphene.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    node = graphene.relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")
