from __future__ import absolute_import
import os
from celery import Celery
from student_accommodation import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "student_accommodation.settings")

app = Celery("student_accommodation")
app.config_from_object("student_accommodation.settings", namespace="CELERY")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
