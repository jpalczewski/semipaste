import graphene
from .nodes import PasteBinNode
from ..models import PasteBin


class HotPasteBinQuery:
    hot_paste_bins = graphene.List(PasteBinNode)

    def resolve_hot_paste_bins(self, info, **kwargs):
        objs = list(PasteBin.objects.all())
        return sorted(objs, key=lambda el: el.get_hot(), reverse=True)
