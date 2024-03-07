from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.password_validation import validate_password


class CustomUserManager(BaseUserManager):

    def normalize_email(self, email):
        return email.lower()

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        normalized_email = self.normalize_email(email)

        user = self.model(
            email=normalized_email,
        )
        validate_password(password)
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_landlord(self, email, password, **extra_fields):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_landlord = True
        user.save(using=self._db)
        return user

    def create_student(self, email, password, **extra_fields):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_student = True
        user.save(using=self._db)
        return user
