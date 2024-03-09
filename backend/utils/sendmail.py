"""Sends an email to the specified recipient list."""

import os
from django.core.mail import send_mail
from celery import shared_task


@shared_task
def sendmail(subject, message, recipient_list):
    """Sends an email to the specified recipient list."""
    from_email = (os.getenv("DEFAULT_FROM_EMAIL"),)
    auth_password = (os.getenv("EMAIL_HOST_PASSWORD"),)
    auth_user = (os.getenv("EMAIL_HOST_USER"),)
    send_mail(
        subject,
        message,
        from_email,
        recipient_list,
        fail_silently=False,
        auth_user=auth_user,
        auth_password=auth_password,
    )
