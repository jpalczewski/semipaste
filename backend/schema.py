# 3rd-Party
import graphene
import graphql_jwt
from graphene import relay
from graphene_django.debug import DjangoDebug

# Project
from pastes.schema import PasteBinMutation, PasteBinQuery
from users.schema import ObtainJSONWebTokenUser, UserMutation, UserQuery


class Mutation(UserMutation, PasteBinMutation):
    token_auth = ObtainJSONWebTokenUser.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    # revoke_token = graphql_jwt.relay.Revoke.Field()


class Query(UserQuery, PasteBinQuery):
    # this is required due to react relay integration
    node = relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")


schema_v1 = graphene.Schema(query=Query, mutation=Mutation)
