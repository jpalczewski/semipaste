# Standard Library
import os

# 3rd-Party
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
os.environ.setdefault('DJANGO_CONFIGURATION', 'Dev')

# 3rd-Party
import configurations

configurations.setup()

app = Celery(
    "semipaste", broker=os.environ.get('REDIS_URL'), backend=os.environ.get('REDIS_URL')
)
app.conf.result_backend = os.environ.get('REDIS_URL')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
