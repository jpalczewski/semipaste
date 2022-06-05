# 3rd-Party
import graphene
import graphql_jwt
from graphene import relay
from graphene_django.debug import DjangoDebug

# Project
from pastes.mutations import PasteBinMutation
from pastes.queries import LanguageQuery, PasteBinQuery
from reports.mutations import ReportMutation
from reports.queries import ReportQuery
from users.mutations import UserMutation
from users.queries import UserQuery


class Mutation(UserMutation, PasteBinMutation, ReportMutation):
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()


class Query(UserQuery, PasteBinQuery, LanguageQuery, ReportQuery):
    # this is required due to react relay integration
    node = relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")


schema_v1 = graphene.Schema(query=Query, mutation=Mutation)
