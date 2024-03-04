"""
Serializers for the core app.
"""

from django.utils import timezone
from rest_framework import serializers
from .models import (
    Student,
    Landlord,
    Institution,
    Booking,
    Property,
    Room,
    RoomImage,
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
            "registration_number",
            "program",
            "level",
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
        instance.registration_number = validated_data.get(
            "registration_number", instance.registration_number
        )
        instance.program = validated_data.get("program", instance.program)
        instance.level = validated_data.get("level", instance.level)
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
        fields = [
            "id",
            "url",
            "user",
            "properties",
            "city",
            "preferred_payment_method",
            "address",
            "bank_name",
            "account_name",
            "account_number",
            "ecocash_number",
            "is_verified",
        ]
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
        instance.city = validated_data.get("city", instance.city)
        instance.preferred_payment_method = validated_data.get(
            "preferred_payment_method", instance.preferred_payment_method
        )
        instance.address = validated_data.get("address", instance.address)
        instance.bank_name = validated_data.get("bank_name", instance.bank_name)
        instance.account_name = validated_data.get(
            "account_name", instance.account_name
        )
        instance.account_number = validated_data.get(
            "account_number", instance.account_number
        )
        instance.ecocash_number = validated_data.get(
            "ecocash_number", instance.ecocash_number
        )
        instance.is_verified = validated_data.get("is_verified", instance.is_verified)
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
            "owner",
            "property",
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
            "owner",
            "name",
            "property_type",
            "city",
            "location",
            "street",
            "number",
            "amenities",
            "is_published",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"reviews": {"read_only": True}}

    def create(self, validated_data):
        amenities = validated_data.pop("amenities")
        landlord = validated_data.pop("landlord")
        new_property = Property.objects.create(  # pylint: disable=no-member
            landlord=landlord, **validated_data
        )
        new_property.amenities.set(amenities)
        return new_property

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.city = validated_data.get("city", instance.city)
        instance.property_type = validated_data.get(
            "property_type", instance.property_type
        )
        instance.location = validated_data.get("location", instance.location)
        instance.street = validated_data.get("street", instance.street)
        instance.number = validated_data.get("number", instance.number)
        instance.amenities = validated_data.get("amenities", instance.amenities)
        instance.is_published = validated_data.get(
            "is_published", instance.is_published
        )
        instance.updated_at = timezone.now()
        instance.save()
        return instance


class RoomSerializer(serializers.HyperlinkedModelSerializer):
    """
    Room serializer.
    """

    class Meta:
        """
        Room serializer.
        """

        model = Room
        fields = [
            "id",
            "url",
            "property",
            "room_type",
            "name",
            "num_beds",
            "description",
            "price",
            "is_available",
            "display_image",
            "images",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        new_property = validated_data.pop("property")
        images = validated_data.pop("images")
        room = Room.objects.create(  # pylint: disable=no-member
            property=new_property, **validated_data
        )
        for image in images:
            RoomImage.objects.create(  # pylint: disable=no-member
                room=room, image=image
            )
        return room

    def update(self, instance, validated_data):
        instance.property = validated_data.get("property", instance.property)
        instance.room_type = validated_data.get("room_type", instance.room_type)
        instance.name = validated_data.get("name", instance.name)
        instance.num_beds = validated_data.get("num_beds", instance.num_beds)
        instance.description = validated_data.get("description", instance.description)
        instance.price = validated_data.get("price", instance.price)
        instance.is_available = validated_data.get(
            "is_available", instance.is_available
        )
        instance.display_image = validated_data.get(
            "display_image", instance.display_image
        )
        instance.updated_at = timezone.now()
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


class AmenitySerializer(serializers.HyperlinkedModelSerializer):
    """Amenity serializer."""

    class Meta:
        """Amenity serializer."""

        model = Amenity
        fields = ["id", "url", "name"]

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
