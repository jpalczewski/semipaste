# Standard Library
from datetime import datetime, timedelta, timezone

# 3rd-Party
import graphene

# Local
from ..models import PasteBin
from .nodes import PasteBinNode


class PopularPasteBinQuery:
    popular_paste_bin = graphene.List(
        PasteBinNode, mode=graphene.String(required=True), topFilter=graphene.String()
    )

    def resolve_popular_paste_bin(self, info, **kwargs):  # type: ignore
        mode = kwargs.get('mode')
        match mode:
            case "top":
                topFilter = kwargs.get('topFilter')
                return PopularPasteBinQuery.get_top_paste_bin(topFilter)
            case "hot":
                return PopularPasteBinQuery.get_hot_paste_bin()

    @staticmethod
    def get_hot_paste_bin():  # type: ignore
        objs = list(
            PasteBin.objects.filter(
                visible=True,
                date_of_expiry__gte=datetime.now().replace(tzinfo=timezone.utc),
            )
        )
        return sorted(objs, key=lambda el: el.get_hot(), reverse=True)

    @staticmethod
    def get_top_paste_bin(filter: str):  # type: ignore
        res = PasteBin.objects.filter(
            visible=True,
            date_of_expiry__gte=datetime.now().replace(tzinfo=timezone.utc),
        )
        match filter:
            case "today":
                today = datetime.today()
                res = res.filter(
                    date_of_creation__year=today.year,
                    date_of_creation__month=today.month,
                    date_of_creation__day=today.day,
                )
            case "week":
                res = res.filter(
                    date_of_creation__lt=datetime.now().replace(tzinfo=timezone.utc)
                    + timedelta(days=7)
                )
            case "month":
                res = res.filter(
                    date_of_creation__lt=datetime.now().replace(tzinfo=timezone.utc)
                    + timedelta(days=30)
                )
            case "year":
                res = res.filter(
                    date_of_creation__lt=datetime.now().replace(tzinfo=timezone.utc)
                    + timedelta(days=360)
                )
        return sorted(res, key=lambda paste: paste.get_total_rating(), reverse=True)
