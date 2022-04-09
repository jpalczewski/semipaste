# 3rd-Party
import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField

# Project
from reports.queries.reported_users import UserReportType


class ReportQuery(graphene.ObjectType):
    report = relay.Node.Field(UserReportType)
    reports = DjangoFilterConnectionField(UserReportType)
