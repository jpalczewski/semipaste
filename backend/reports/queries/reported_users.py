# Django
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

# 3rd-Party
import graphene
from graphene_django import DjangoObjectType

# Project
from reports.models import Report
from users.models import User
from users.mutations import UserNode


class UserReportType(DjangoObjectType):
    class Meta:
        model = Report
        fields = ('reason',)

    user = graphene.Field(UserNode)

    def resolve_user(self, info):  # type: ignore
        user = User.objects.filter(pk=self.object_id).last()
        return user

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        user_model_id = ContentType.objects.get_for_model(get_user_model()).id
        return queryset.filter(content_type_id=user_model_id)


# class UserReportConnection(relay.Connection):
#     class Meta:
#         node = UserReportType
#
# class ReportedUser(graphene.ObjectType):
#
#     class Meta:
#         interfaces = (relay.Node,)
#
#     name = graphene.String(description="The name of the ship.")
#
#     @classmethod
#     def get_node(cls, info, id):
#         return get_ship(id)
