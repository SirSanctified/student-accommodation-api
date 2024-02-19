from django.db import models
from accounts.models import User


class Amenity(models.Model):
    class Meta:
        verbose_name_plural = "Amenities"
        verbose_name = "Amenity"
        ordering = ["name"]
    
    name = models.CharField(max_length=80, null=False, blank=False)
    icon = models.ImageField(upload_to='amenities', null=True, blank=True)

    def __str__(self):
        return self.name


class City(models.Model):
    class Meta:
        verbose_name_plural = "Cities"
        verbose_name = "City"
        ordering = ["name"]
    
    name = models.CharField(max_length=80, null=False, blank=False)

    def __str__(self):
        return self.name


class Landlord(models.Model):
    class Meta:
        verbose_name_plural = "Landlords"
        verbose_name = "Landlord"
        ordering = ["user"]

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email


class Property(models.Model):
    class Meta:
        verbose_name_plural = "Properties"
        verbose_name = "Property"

    name = models.CharField(max_length=255, null=True, blank=True)
    owner = models.ForeignKey('accounts.User', on_delete=models.CASCADE, null=True, blank=True)
    landlord = models.ForeignKey(Landlord, related_name='properties', on_delete=models.CASCADE, null=True)
    description = models.TextField(null=True, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    location = models.CharField(max_length=255, null=False, blank=False)
    street = models.CharField(max_length=255, null=False, blank=False)
    number = models.CharField(max_length=10, null=False, blank=False)
    amenities = models.ManyToManyField(Amenity, blank=True)
    total_rooms = models.IntegerField(null=False, blank=False)
    rooms_single = models.IntegerField(null=False, blank=False)
    price_single = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    price_shared = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"

class PropertyImage(models.Model):
    class Meta:
        verbose_name_plural = "Property Images"
        verbose_name = "Property Image"
    
    image = models.ImageField(upload_to="properties/images", null=False, blank=False)
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE, null=False, blank=False)


class Institution(models.Model):
    class Meta:
        verbose_name_plural = "Institutions"
        verbose_name = "Institution"
        ordering = ["name"]

    name = models.CharField(max_length=255, null=False, blank=False)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return f"{self.name} - {self.city}"
    

class Student(models.Model):
    class Meta:
        verbose_name_plural = "Students"
        verbose_name = "Student"
        ordering = ["user"]

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.institution}"


class Review(models.Model):
    class Meta:
        verbose_name_plural = "Reviews"
        verbose_name = "Review"
        ordering = ["-created_at"]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True, blank=False)
    owner = models.ForeignKey('accounts.User', on_delete=models.CASCADE, null=True)
    property = models.ForeignKey(Property, related_name='reviews', on_delete=models.CASCADE, null=False, blank=False)
    rating = models.IntegerField(null=False, blank=False)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user} - {self.property}"
    

class Booking(models.Model):
    class Meta:
        verbose_name_plural = "Bookings"
        verbose_name = "Booking"
        ordering = ["-created_at"]

    student = models.OneToOneField(Student, related_name='bookings', on_delete=models.CASCADE, null=False, blank=False)
    owner = models.ForeignKey('accounts.User', on_delete=models.CASCADE, null=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, null=False, blank=False)
    room_type = models.CharField(max_length=255, default='shared', null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student} - {self.property}"

