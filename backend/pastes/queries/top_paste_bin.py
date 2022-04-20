# 3rd-Party
from datetime import timezone, datetime, timedelta

import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

# Project
from pastes.models import PasteBin


class TopPasteBinDay(DjangoObjectType):
    class Meta:
        model = PasteBin
        filter_fields = ['id', 'date_of_creation']
        exclude = ("attachment_token",)
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        today = datetime.today()
        paste_day = PasteBin.objects.filter(
            date_of_creation__year=today.year,
            date_of_creation__month=today.month,
            date_of_creation__day=today.day
        )
        return sorted(paste_day, key=lambda paste: paste.get_likes(), reverse=True)

class TopPasteBinWeek(DjangoObjectType):
    class Meta:
        model = PasteBin
        filter_fields = ['id', 'date_of_creation']
        exclude = ("attachment_token",)
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        paste_week = PasteBin.objects.filter(
            date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=7)
        )
        return sorted(paste_week, key=lambda paste: paste.get_likes(), reverse=True)

class TopPasteBinMonth(DjangoObjectType):
    class Meta:
        model = PasteBin
        filter_fields = ['id', 'date_of_creation']
        exclude = ("attachment_token",)
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        paste_month = PasteBin.objects.filter(
            date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=30)
        )
        return sorted(paste_month, key=lambda paste: paste.get_likes(), reverse=True)

class TopPasteBinYear(DjangoObjectType):
    class Meta:
        model = PasteBin
        filter_fields = ['id', 'date_of_creation']
        exclude = ("attachment_token",)
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        paste_month = PasteBin.objects.filter(
            date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=360)
        )
        return sorted(paste_month, key=lambda paste: paste.get_likes(), reverse=True)
