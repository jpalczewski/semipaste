# Standard Library
from datetime import datetime

# 3rd-Party
import factory
from faker import Faker

# Local
from .models import PasteBin

fake = Faker('pl_PL')


class PasteBinFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PasteBin

    title = fake.sentence()[:50]
    text = fake.paragraph()
    visible = factory.Iterator([True, False])
    date_of_creation = factory.LazyFunction(datetime.now)
    expire_after = factory.Iterator(PasteBin.ExpireChoices)
    date_of_expiry = None
    author = None
