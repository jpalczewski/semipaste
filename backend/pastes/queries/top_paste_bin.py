from datetime import timezone, datetime, timedelta
import graphene
from graphene_django.filter import DjangoFilterConnectionField
from .nodes import PasteBinNode
from ..models import PasteBin

class TopPasteBinQuery:
    top_paste_bins = DjangoFilterConnectionField(PasteBinNode, mode=graphene.String())

    def resolve_top_paste_bins(self, info, **kwargs):
        mode = kwargs.get('mode')
        res = PasteBin.objects.filter(total_rating__gt=0).order_by('-total_rating')
        temp = []
        match mode:
            case "today":
                today = datetime.today()
                temp = res.filter(
                    date_of_creation__year=today.year,
                    date_of_creation__month=today.month,
                    date_of_creation__day=today.day
                )
            case "week":
                temp = res.filter(
                    date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=7)
                )
            case "month":
                temp = res.filter(
                    date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=30)
                )
            case "year":
                temp = res.filter(
                    date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=360)
                )
        if temp:
            res = temp
        return res
