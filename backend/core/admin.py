from django.contrib import admin
from .models import (
    Student,
    Landlord,
    Property,
    RoomImage,
    City,
    Institution,
    Amenity,
    Review,
    Booking,
    LandlordVerificationDocument,
    LandlordVerificationRequest,
    Room,
)


@admin.register(Student)
class StudentModelAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "institution",
    ]
    search_fields = ["institution", "created_at", "updated_at"]
    list_filter = ["institution", "created_at", "updated_at"]
    list_per_page = 25


@admin.register(Landlord)
class LandlordModelAdmin(admin.ModelAdmin):
    list_display = [
        "user",
    ]
    search_fields = ["created_at", "updated_at"]
    list_filter = ["created_at", "updated_at"]
    list_per_page = 25


class RoomImageModelAdmin(admin.StackedInline):
    model = RoomImage
    list_display = ["room", "image", "created_at", "updated_at"]
    list_filter = ["created_at", "updated_at"]


@admin.register(Property)
class PropertyModelAdmin(admin.ModelAdmin):
    list_display = [
        "city",
        "location",
        "street",
        "number",
        "is_published",
        "created_at",
        "updated_at",
    ]
    list_filter = ["is_published", "created_at", "updated_at"]
    list_per_page = 25


@admin.register(Booking)
class BookingModelAdmin(admin.ModelAdmin):
    list_display = ["owner", "room"]
    list_filter = ["created_at", "updated_at"]
    list_per_page = 25


@admin.register(City)
class CityModelAdmin(admin.ModelAdmin):
    list_display = ["name"]
    list_per_page = 25


@admin.register(Review)
class ReviewModelAdmin(admin.ModelAdmin):
    list_display = ["owner", "property", "rating"]
    list_filter = ["owner", "property", "created_at"]
    list_per_page = 25


@admin.register(Institution)
class InstitutionModelAdmin(admin.ModelAdmin):
    list_display = ["name", "city"]
    search_fields = [
        "name",
    ]
    list_display_links = ["name"]
    list_filter = ["city"]
    list_per_page = 25


@admin.register(Amenity)
class AmenityModelAdmin(admin.ModelAdmin):
    list_display = ["name"]
    list_per_page = 25


@admin.register(LandlordVerificationDocument)
class LandlordVerificationDocumentModelAdmin(admin.ModelAdmin):
    list_display = ["landlord", "document_type"]
    list_filter = ["landlord", "document_type"]
    list_per_page = 25


@admin.register(LandlordVerificationRequest)
class LandlordVerificationRequestModelAdmin(admin.ModelAdmin):
    list_display = ["landlord", "status"]
    list_filter = ["landlord", "status"]
    list_per_page = 25


@admin.register(Room)
class RoomModelAdmin(admin.ModelAdmin):
    list_display = [
        "property",
        "room_type",
        "name",
        "is_available",
        "num_beds",
        "price",
    ]
    list_filter = ["property", "room_type"]
    list_per_page = 25
