"""
This module contains the Django models for the student accommodation API.

The models in this module represent various entities such as amenities, cities, landlords,
properties, rooms, room images, institutions, students, reviews, and bookings.

Each model has its own set of fields and relationships with other models, which are defined
using Django's model fields and relationships.

These models are used to define the structure and behavior of the database tables that store
data related to student accommodations.

Note: This module requires the Django framework and the 'accounts' app to be installed and
configured properly.
"""

from django.db import models
from django.forms import ValidationError
from django.core.validators import MinValueValidator
from accounts.models import User


class Amenity(models.Model):
    """Amenity model"""

    class Meta:
        """Meta class for Amenity model"""

        verbose_name_plural = "Property Amenities"
        verbose_name = "Property Amenity"
        ordering = ["name"]

    name = models.CharField(max_length=80, null=False, blank=False)

    def __str__(self):
        return f"{self.name}"


class City(models.Model):
    """City model"""

    class Meta:
        """Meta class for City model"""

        verbose_name_plural = "Cities"
        verbose_name = "City"
        ordering = ["name"]

    name = models.CharField(max_length=80, null=False, blank=False)

    def __str__(self):
        return f"{self.name}"


class Landlord(models.Model):
    """Landlord model"""

    class Meta:
        """Meta class for Landlord model"""

        verbose_name_plural = "Landlords"
        verbose_name = "Landlord"
        ordering = ["user"]

    PAYMENT_METHODS = [
        ("bank transfer", "Bank Transfer"),
        ("ecocash usd", "Ecocash USD"),
        ("cash usd", "Cash USD"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    preferred_payment_method = models.CharField(
        max_length=50, choices=PAYMENT_METHODS, null=True, blank=True
    )
    bank_name = models.CharField(max_length=255, null=True, blank=True)
    account_name = models.CharField(max_length=255, null=True, blank=True)
    account_number = models.CharField(max_length=255, null=True, blank=True)
    ecocash_number = models.CharField(max_length=255, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}"


class Property(models.Model):
    """
    Property model
    """

    class Meta:
        """
        Meta class for Property model
        """

        verbose_name_plural = "Properties"
        verbose_name = "Property"

    PROPERTY_TYPES = [
        ("boarding house", "Boarding House"),
        ("hostel", "Hostel"),
        ("house", "House"),
        ("apartment", "Apartment"),
        ("cottage", "Cottage"),
        ("flat", "Flat"),
    ]
    name = models.CharField(max_length=255, null=True, blank=True)
    property_type = models.CharField(
        max_length=255,
        choices=PROPERTY_TYPES,
        default="boarding house",
        null=True,
        blank=True,
    )
    owner = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, null=True, blank=True
    )
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    location = models.CharField(max_length=255, null=False, blank=False)
    street = models.CharField(max_length=255, null=False, blank=False)
    number = models.CharField(max_length=10, null=False, blank=False)
    amenities = models.ManyToManyField(Amenity, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"


class Room(models.Model):
    """
    Room model
    """

    class Meta:
        """
        Meta class for Room model
        """

        verbose_name_plural = "Rooms"
        verbose_name = "Room"
        ordering = ["-created_at"]

    ROOM_TYPES = [
        ("single", "Single"),
        ("double", "Double"),
        ("triple", "Triple"),
        ("quadruple", "Quadruple"),
        ("dormitory", "Dormitory"),
    ]
    property = models.ForeignKey(
        Property,
        related_name="rooms",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    room_type = models.CharField(
        max_length=255, choices=ROOM_TYPES, default="single", null=False, blank=False
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=False,
        blank=False,
        validators=[MinValueValidator(0.00)],
    )
    num_beds = models.IntegerField(
        null=False, blank=False, validators=[MinValueValidator(1)]
    )
    occupied_beds = models.IntegerField(
        null=False,
        blank=False,
        default=0,
        validators=[
            MinValueValidator(0),
        ],
    )
    available_beds = models.IntegerField(
        null=False,
        blank=False,
        default=0,
        validators=[MinValueValidator(1)],
    )
    is_available = models.BooleanField(default=True)
    display_image = models.ImageField(
        upload_to="rooms/images",
        null=True,
        blank=True,
        default="rooms/images/default.jpg",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.pk and self.occupied_beds == 0:
            self.available_beds = self.num_beds
        else:
            self.available_beds = self.num_beds - self.occupied_beds

        if self.occupied_beds == self.num_beds:
            self.is_available = False

        super().save(*args, **kwargs)

    def clean(self):
        """
        Clean the data by checking if the number of occupied and available beds
        exceed the total number of beds.
        """
        if self.occupied_beds > self.num_beds:
            raise ValidationError(
                {
                    "occupied_beds": "Occupied beds cannot exceed the total number of beds."
                }
            )
        if self.available_beds > self.num_beds:
            raise ValidationError(
                {
                    "available_beds": "Available beds cannot exceed the total number of beds."
                }
            )
        if self.available_beds + self.occupied_beds > self.num_beds:
            raise ValidationError(
                {
                    "available_beds": "Available and occupied beds (sum) cannot exceed the \
                        total number of beds."
                }
            )
        if self.occupied_beds + self.available_beds != self.num_beds:
            raise ValidationError(
                {
                    "occupied_beds": "Occupied and available beds (sum) must equal the total \
                        number of beds."
                }
            )

    def __str__(self):
        return f"{self.name} - {self.property}"


class RoomImage(models.Model):
    """
    Room Image model
    """

    class Meta:
        """
        Meta class for Room Image model
        """

        verbose_name_plural = "Room Images"
        verbose_name = "Room Image"
        ordering = ["-created_at"]

    image = models.ImageField(upload_to="rooms/images", null=False, blank=False)
    room = models.ForeignKey(
        Room,
        related_name="images",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.room}"


class Institution(models.Model):
    """Institution model"""

    class Meta:
        """Meta class for Institution model"""

        verbose_name_plural = "Institutions"
        verbose_name = "Institution"
        ordering = ["name"]

    name = models.CharField(max_length=255, null=False, blank=False)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return f"{self.name} - {self.city}"


class Student(models.Model):
    """Student model"""

    class Meta:
        """Meta class for Student model"""

        verbose_name_plural = "Students"
        verbose_name = "Student"
        ordering = ["user"]

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)
    institution = models.ForeignKey(
        Institution, on_delete=models.CASCADE, null=True, blank=False
    )
    registration_number = models.CharField(max_length=255, null=True, blank=True)
    program = models.CharField(max_length=255, null=True, blank=True)
    level = models.CharField(max_length=10, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.registration_number}"


class Review(models.Model):
    """Review model"""

    class Meta:
        """Meta class for Review model"""

        verbose_name_plural = "Property Reviews"
        verbose_name = "Property Review"
        ordering = ["-created_at"]

    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    property = models.ForeignKey(
        Property,
        related_name="reviews",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    rating = models.IntegerField(null=False, blank=False)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.owner} - {self.property}"


class Booking(models.Model):
    """Booking model"""

    class Meta:
        """Meta class for Booking model"""

        verbose_name_plural = "Room Bookings"
        verbose_name = "Room Booking"
        ordering = ["-created_at"]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
        ("cancelled", "Cancelled"),
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False, blank=False)
    start_date = models.DateField(null=False, blank=False)
    end_date = models.DateField(null=False, blank=False)
    status = models.CharField(
        max_length=255,
        null=False,
        blank=False,
        default="pending",
        choices=STATUS_CHOICES,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.owner} - {self.room}"
