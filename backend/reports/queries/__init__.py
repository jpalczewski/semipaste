# Django
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

# 3rd-Party
import graphene

# Project
from reports.models import Report
from reports.queries.reported_users import UserReportType


class ReportQuery(graphene.ObjectType):
    reports = graphene.List(UserReportType)

    def resolve_reports(root, info):  # type: ignore
        user_model_id = ContentType.objects.get_for_model(get_user_model()).id
        return Report.objects.filter(content_type_id=user_model_id)
