# 3rd-Party
import graphene
import graphql_jwt
from graphene import relay
from graphene_django.debug import DjangoDebug

# Project
from pastes.mutations import PasteBinMutation
from pastes.queries import PasteBinQuery
from users.mutations import UserMutation
from users.queries import UserQuery


class Mutation(UserMutation, PasteBinMutation):
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    revoke_token = graphql_jwt.relay.Revoke.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field()


class Query(UserQuery, PasteBinQuery):
    # this is required due to react relay integration
    node = relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")


schema_v1 = graphene.Schema(query=Query, mutation=Mutation)
