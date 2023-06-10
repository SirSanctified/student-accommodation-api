from django.db import models
from django.contrib.auth.models import AbstractUser
from . custom_managers import CustomUserManager

class User(AbstractUser):
    class Meta:
        verbose_name_plural = "Users"
        verbose_name = "User"

    username = None
    email = models.EmailField(max_length=255, unique=True, null=False, blank=False)
    phone = models.CharField(max_length=255, null=True, blank=True)
    first_name = models.CharField(max_length=255, null=False, blank=False)
    last_name = models.CharField(max_length=255, null=False, blank=False)
    avatar = models.ImageField(upload_to="avatars", null=True, blank=True)
    is_student = models.BooleanField(default=False)
    is_landlord = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
