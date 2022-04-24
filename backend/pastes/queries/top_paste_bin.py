from datetime import timezone, datetime, timedelta
import graphene
from .nodes import PasteBinNode
from ..models import PasteBin

class TopPasteBinQuery:
    top_paste_bins = graphene.List(PasteBinNode, mode=graphene.String())

    def resolve_top_paste_bins(self, info, **kwargs):
        mode = kwargs.get('mode')
        res = PasteBin.objects.all()
        match mode:
            case "today":
                today = datetime.today()
                res = res.filter(
                    date_of_creation__year=today.year,
                    date_of_creation__month=today.month,
                    date_of_creation__day=today.day
                )
            case "week":
                res = res.filter(
                    date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=7)
                )
            case "month":
                res = res.filter(
                    date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=30)
                )
            case "year":
                res = res.filter(
                    date_of_creation__lt = datetime.now().replace(tzinfo=timezone.utc) + timedelta(days=360)
                )
        return sorted(filter(lambda paste: (paste.get_total_rating() > 0), res), key=lambda paste: paste.get_total_rating())
