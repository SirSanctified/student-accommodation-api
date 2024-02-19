from django.db.models.signals import post_save
from django.dispatch import receiver
from core.models import Student, Landlord
from . models import User


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.is_student:
            Student.objects.create(user=instance)
        if instance.is_landlord:
            Landlord.objects.create(user=instance)
