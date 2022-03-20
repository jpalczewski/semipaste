# 3rd-Party
import graphene
from graphene_django.debug import DjangoDebug
from graphene_django.filter import DjangoFilterConnectionField

# Local
from .mutations import UserNode


class UserQuery(graphene.ObjectType):
    user = graphene.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    node = graphene.relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")
