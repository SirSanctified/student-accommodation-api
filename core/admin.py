from django.contrib import admin
from . models import (
    Student,
    Landlord,
    Property,
    PropertyImage,
    City,
    Institution,
    Amenity,
    Review,
    Booking,
)


@admin.register(Student)
class StudentModelAdmin(admin.ModelAdmin):
    list_display = ['user', 'institution',]
    search_fields = ['institution', 'created_at', 'updated_at']
    list_filter = ['institution', 'created_at', 'updated_at']
    list_per_page = 25


@admin.register(Landlord)
class LandlordModelAdmin(admin.ModelAdmin):
    list_display = ['user',]
    search_fields = ['created_at', 'updated_at']
    list_filter = [ 'created_at', 'updated_at']
    list_per_page = 25

@admin.register(PropertyImage)
class PropertyImageModelAdmin(admin.StackedInline):
    list_display = ['property', 'image', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']

@admin.register(Property)
class PropertyModelAdmin(admin.ModelAdmin):
    inlines = [PropertyImageModelAdmin]
    list_display = ['city', 'location', 'street', 'number', 'total_rooms', 'is_published', 'created_at', 'updated_at']
    list_filter = ['is_published', 'created_at', 'updated_at']
    list_per_page = 25


@admin.register(Booking)
class BookingModelAdmin(admin.ModelAdmin):
    list_display = ['student', 'property']
    list_filter = ['created_at', 'updated_at']
    list_per_page = 25


@admin.register(City)
class CityModelAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_per_page = 25


@admin.register(Review)
class ReviewModelAdmin(admin.ModelAdmin):
    list_display = ['student', 'property', 'rating']
    list_filter = ['student', 'property', 'created_at']
    list_per_page = 25


@admin.register(Institution)
class InstitutionModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'city']
    search_fields = ['name',]
    list_display_links = ['name']
    list_filter = ['city']
    list_per_page = 25



@admin.register(Amenity)
class AmenityModelAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_per_page = 25
