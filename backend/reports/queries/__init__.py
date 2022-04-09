# 3rd-Party
import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField

# Project
from reports.queries.reported_pastes import PasteReportType
from reports.queries.reported_users import UserReportType


class ReportQuery(graphene.ObjectType):
    user_report = relay.Node.Field(UserReportType)
    user_reports = DjangoFilterConnectionField(UserReportType)
    paste_report = relay.Node.Field(PasteReportType)
    paste_reports = DjangoFilterConnectionField(PasteReportType)
