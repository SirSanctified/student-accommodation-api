"""Sends an email to the specified recipient list."""

from django.core.mail import send_mail
import os


def send_email(
    subject, message, recipient_list, from_email=os.getenv("DEFAULT_FROM_EMAIL")
):
    """Sends an email to the specified recipient list."""
    send_mail(
        subject,
        message,
        recipient_list,
        from_email,
        fail_silently=False,
    )
