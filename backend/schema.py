# 3rd-Party
import graphene
from graphene import relay
from graphene_django.debug import DjangoDebug

# Project
from pastes.mutations import PasteBinMutation
from pastes.queries import PasteBinQuery
from users.mutations import UserMutation
from users.queries import UserQuery


class Mutation(UserMutation, PasteBinMutation):
    pass


class Query(UserQuery, PasteBinQuery):
    # this is required due to react relay integration
    node = relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")


schema_v1 = graphene.Schema(query=Query, mutation=Mutation)
