# 3rd-Party
import graphene
from graphene import relay
from graphene_django.debug import DjangoDebug
import graphql_jwt

# Project
from pastes.schema import PasteBinMutation, PasteBinQuery
from users.schema import UserMutation, UserQuery, ObtainJSONWebTokenUser


class Mutation(UserMutation, PasteBinMutation):
    token_auth = ObtainJSONWebTokenUser.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()


class Query(UserQuery, PasteBinQuery):
    # this is required due to react relay integration
    node = relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")


schema_v1 = graphene.Schema(query=Query, mutation=Mutation)
