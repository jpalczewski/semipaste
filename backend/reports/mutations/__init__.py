# 3rd-Party
import graphene

# Project
from reports.mutations.report_paste import ReportPaste
from reports.mutations.report_user import ReportUser


class ReportMutation(graphene.ObjectType):
    report_user = ReportUser.Field()
    report_paste = ReportPaste.Field()
