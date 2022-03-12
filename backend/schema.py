import graphene
from graphene import relay

from pastes.schema import PasteBinQuery
from users.schema import UserMutation
from users.schema import UserQuery
from pastes.schema import PasteBinMutation
from graphene_django.debug import DjangoDebug


class Mutation(UserMutation, PasteBinMutation):
    pass


class Query(UserQuery, PasteBinQuery):
    # this is required due to react relay integration
    node = relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(query=Query, mutation=Mutation)

