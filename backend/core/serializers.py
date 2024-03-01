"""
Serializers for the core app.
"""

from django.utils import timezone
from rest_framework import serializers
from .models import (
    PropertyImage,
    Student,
    Landlord,
    Institution,
    Booking,
    Property,
    Amenity,
    City,
    Review,
)


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    """Student serializer."""

    class Meta:
        """Student serializer."""

        model = Student
        fields = [
            "id",
            "url",
            "user",
            "institution",
            "bookings",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"bookings": {"read_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = validated_data.pop("user")
        student = Student.objects.create(  # pylint: disable=no-member
            user=user, **validated_data
        )
        user.is_student = True
        user.save()
        return student

    def update(self, instance, validated_data):
        instance.user = validated_data.get("user", instance.user)
        instance.institution = validated_data.get("institution", instance.institution)
        instance.save()
        return instance

    def delete(self, instance):
        """
        Deletes the given instance and returns the deleted instance.

        Parameters:
            instance: the instance to be deleted

        Returns:
            The deleted instance
        """
        instance.delete()
        return instance


class LandlordSerializer(serializers.HyperlinkedModelSerializer):
    """Landlord serializer."""

    class Meta:
        """Landlord serializer."""

        model = Landlord
        fields = ["id", "url", "user", "properties"]
        extra_kwargs = {"properties": {"read_only": True}}

    def create(self, validated_data):
        user = validated_data.pop("user")
        landlord = Landlord.objects.create(  # pylint: disable=no-member
            user=user, **validated_data
        )
        user.is_landlord = True
        user.save()
        return landlord

    def update(self, instance, validated_data):
        properties = validated_data.pop("properties")
        instance.user = validated_data.get("user", instance.user)
        instance.properties = properties
        instance.save()
        return instance

    def delete(self, instance):
        """
        Deletes the given instance and returns the deleted instance.

        :param instance: The instance to be deleted
        :return: The deleted instance
        """
        instance.delete()
        return instance


class InstitutionSerializer(serializers.HyperlinkedModelSerializer):
    """Institution serializer."""

    class Meta:
        """Institution serializer."""

        model = Institution
        fields = ["id", "url", "name", "city"]

    def create(self, validated_data):
        institution = Institution.objects.create(  # pylint: disable=no-member
            **validated_data
        )
        return institution

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.city = validated_data.get("city", instance.city)
        instance.save()
        return instance

    def destroy(self, instance):
        """
        Delete the given instance and return it.
        """
        instance.delete()
        return instance


class BookingSerializer(serializers.HyperlinkedModelSerializer):
    """Booking serializer."""

    owner = serializers.ReadOnlyField(source="owner.id")

    class Meta:
        """Booking serializer."""

        model = Booking
        fields = [
            "id",
            "url",
            "student",
            "owner",
            "property",
            "room_type",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        student = validated_data.pop("student")
        new_property = validated_data.pop("property")
        booking = Booking.objects.create(  # pylint: disable=no-member
            student=student, property=new_property, **validated_data
        )
        return booking

    def update(self, instance, validated_data):
        instance.student = validated_data.get("student", instance.student)
        instance.property = validated_data.get("property", instance.property)
        instance.updated_at = timezone.now()
        instance.save()
        return instance

    def delete(self, instance):
        """
        Deletes the given instance and returns it.

        Parameters:
            instance: the instance to be deleted

        Returns:
            The deleted instance
        """
        instance.delete()
        return instance


class PropertySerializer(serializers.HyperlinkedModelSerializer):
    """Property serializer."""

    owner = serializers.ReadOnlyField(source="owner.id")

    class Meta:
        """Property serializer."""

        model = Property
        fields = [
            "url",
            "id",
            "landlord",
            "owner",
            "name",
            "images",
            "description",
            "city",
            "location",
            "street",
            "number",
            "total_rooms",
            "rooms_single",
            "price_single",
            "price_shared",
            "amenities",
            "reviews",
            "is_published",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"reviews": {"read_only": True}}

    def create(self, validated_data):
        amenities = validated_data.pop("amenities")
        landlord = validated_data.pop("landlord")
        property_images = validated_data.pop("images")
        new_property = Property.objects.create(  # pylint: disable=no-member
            landlord=landlord, **validated_data
        )
        for image in property_images:
            PropertyImage.objects.create(  # pylint: disable=no-member
                property=new_property, image=image
            )
        new_property.amenities.set(amenities)
        return new_property

    def update(self, instance, validated_data):
        instance.landlord = validated_data.get("landlord", instance.landlord)
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.city = validated_data.get("city", instance.city)
        instance.location = validated_data.get("location", instance.location)
        instance.street = validated_data.get("street", instance.street)
        instance.number = validated_data.get("number", instance.number)
        instance.total_rooms = validated_data.get("total_rooms", instance.total_rooms)
        instance.rooms_single = validated_data.get(
            "rooms_single", instance.rooms_single
        )
        instance.price_single = validated_data.get(
            "price_single", instance.price_single
        )
        instance.price_shared = validated_data.get(
            "price_shared", instance.price_shared
        )
        instance.amenities = validated_data.get("amenities", instance.amenities)
        instance.is_published = validated_data.get(
            "is_published", instance.is_published
        )
        instance.updated_at = timezone.now()
        instance.save()
        return instance


class AmenitySerializer(serializers.HyperlinkedModelSerializer):
    """Amenity serializer."""

    class Meta:
        """Amenity serializer."""

        model = Amenity
        fields = ["id", "url", "name", "icon"]

    def create(self, validated_data):
        amenity = Amenity.objects.create(**validated_data)  # pylint: disable=no-member
        return amenity

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        return instance

    def delete(self, instance):
        """
        Deletes the given instance and returns the deleted instance.

        :param instance: The instance to be deleted.
        :return: The deleted instance.
        """
        instance.delete()
        return instance


class CitySerializer(serializers.HyperlinkedModelSerializer):
    """City serializer."""

    class Meta:
        """City serializer."""

        model = City
        fields = ["id", "url", "name"]


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    """Review serializer."""

    owner = serializers.ReadOnlyField(source="owner.id")

    class Meta:
        """Review serializer."""

        model = Review
        fields = [
            "id",
            "url",
            "property",
            "student",
            "owner",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        """
        Create a new review object using the validated data and return the created review.

        Parameters:
            validated_data: The validated data used to create the review.

        Returns:
            The created review object.
        """
        new_property = validated_data.pop("property")
        student = validated_data.pop("student")
        review = Review.objects.create(  # pylint: disable=no-member
            property=new_property, student=student, **validated_data
        )
        return review

    def update(self, instance, validated_data):
        """
        Updates the instance with the provided validated data.

        :param instance: The instance to be updated
        :param validated_data: The validated data to update the instance with
        :return: The updated instance
        """

        instance.property = validated_data.get("property", instance.property)
        instance.student = validated_data.get("student", instance.student)
        instance.rating = validated_data.get("rating", instance.rating)
        instance.comment = validated_data.get("comment", instance.comment)
        instance.updated_at = timezone.now()
        instance.save()
        return instance

    def delete(self, instance):
        """
        Deletes the given instance and returns the deleted instance.
        """

        instance.delete()
        return instance
