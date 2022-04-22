# Standard Library
from enum import Enum


class DefaultFilterClasses(Enum):
    DEFAULT_TEXT = [
        'exact',
        'icontains',
        'istartswith',
        'iexact',
        'contains',
        'endswith',
        'iendswith',
    ]
    DEFAULT_DATE = ['exact', 'gte', 'lte', 'range']


PasteBinFilterFields = {
    'id': ['exact'],
    'title': DefaultFilterClasses.DEFAULT_TEXT.value,
    'text': DefaultFilterClasses.DEFAULT_TEXT.value,
    'date_of_creation': DefaultFilterClasses.DEFAULT_DATE.value,
    'visible': ['exact'],
    'expire_after': ['exact'],
    'date_of_expiry': DefaultFilterClasses.DEFAULT_DATE.value,
    'author': ['exact'],
    'language': ['exact'],
    'author__username': DefaultFilterClasses.DEFAULT_TEXT.value,
}
