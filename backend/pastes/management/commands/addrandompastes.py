# Standard Library
from datetime import datetime

# Django
from django.core.management.base import BaseCommand

# 3rd-Party
from faker import Faker

# Project
from pastes.factories import PasteBinFactory


class Command(BaseCommand):
    help = 'Add random pastes via faker'

    def add_arguments(self, parser):  # type:ignore
        parser.add_argument('num', nargs='+', type=int)

    def handle(self, *args, **options):  # type:ignore
        for poll_id in range(options['num'][0]):
            factory = PasteBinFactory
            Faker.seed(datetime.now())
            factory.create().save()

        self.stdout.write(
            self.style.SUCCESS('Successfully added "%s" pastes' % options['num'][0])
        )
