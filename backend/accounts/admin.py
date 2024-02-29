from django.contrib import admin
from .models import User


@admin.register(User)
class UserModelAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "first_name",
        "last_name",
        "is_active",
        "is_admin",
        "is_landlord",
        "is_student",
        "created_at",
        "updated_at",
    ]
    search_fields = [
        "email",
        "first_name",
        "last_name",
        "is_active",
        "is_admin",
        "is_landlord",
        "is_student",
        "created_at",
        "updated_at",
    ]
    list_filter = [
        "is_active",
        "is_admin",
        "is_landlord",
        "is_student",
        "created_at",
        "updated_at",
    ]
    list_per_page = 25
