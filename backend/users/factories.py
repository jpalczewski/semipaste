# Standard Library
from datetime import datetime

# 3rd-Party
import factory
from faker import Faker

# Local
from .models import User

fake = Faker('pl_PL')


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = fake.user_name()
    first_name = fake.first_name()
    last_name = fake.last_name()
    password = fake.password()
    email = fake.email()
    date_joined = factory.LazyFunction(datetime.now)
    is_superuser = True
