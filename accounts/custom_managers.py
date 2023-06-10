from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
    
    def create_landlord(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_landlord = True
        user.save(using=self._db)
        return user
    
    def create_student(self, email, password):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_student = True
        user.save(using=self._db)
        return user
