# Django
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType

# Project
from reports.models import Report
from users.models import User
from users.mutations import UserNode


class UserReportType(DjangoObjectType):
    class Meta:
        model = Report
        fields = ('reason', 'author')
        filter_fields = ['id']
        interfaces = (relay.Node,)

    user = graphene.Field(UserNode)

    def resolve_user(self, info):  # type: ignore
        user = User.objects.filter(pk=self.object_id).last()
        return user

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        user_model_id = ContentType.objects.get_for_model(get_user_model()).id
        return queryset.filter(content_type_id=user_model_id)
