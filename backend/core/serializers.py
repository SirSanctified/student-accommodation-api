"""
Serializers for the core app.
"""

from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
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
    LandlordVerificationDocument,
    LandlordVerificationRequest,
)


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    """Student serializer."""

    class Meta:
        """Student serializer."""

        user = serializers.HyperlinkedRelatedField(
            view_name="user-detail", read_only=True
        )
        model = Student
        fields = [
            "id",
            "url",
            "user",
            "registration_number",
            "program",
            "level",
            "institution",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"bookings": {"read_only": True}}

    def create(self, validated_data):
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


class LandlordSerializer(serializers.HyperlinkedModelSerializer):
    """Landlord serializer."""

    class Meta:
        """Landlord serializer."""

        user = serializers.HyperlinkedRelatedField(
            view_name="user-detail", read_only=True
        )

        model = Landlord
        fields = [
            "id",
            "url",
            "user",
            "city",
            "preferred_payment_method",
            "address",
            "bank_name",
            "account_name",
            "account_number",
            "ecocash_number",
            "is_verified",
            "status",
        ]

    def create(self, validated_data):
        user = validated_data.pop("user")
        landlord = Landlord.objects.create(  # pylint: disable=no-member
            user=user, **validated_data
        )
        user.is_landlord = True
        user.save()
        return landlord

    def update(self, instance, validated_data):
        instance.user = validated_data.get("user", instance.user)
        instance.city = validated_data.get("city", instance.city)
        instance.preferred_payment_method = validated_data.get(
            "preferred_payment_method", instance.preferred_payment_method
        )
        instance.address = validated_data.get("address", instance.address)
        instance.status = validated_data.get("status", instance.status)
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
        instance.save()
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
            "room",
            "status",
            "start_date",
            "end_date",
            "created_at",
            "updated_at",
        ]


class PropertySerializer(serializers.HyperlinkedModelSerializer):
    """Property serializer."""

    owner = serializers.ReadOnlyField(source="owner.id")

    reviews = serializers.HyperlinkedRelatedField(
        view_name="review-detail", read_only=True, many=True
    )

    amenities = serializers.PrimaryKeyRelatedField(
        queryset=Amenity.objects.all(), many=True  # pylint: disable=no-member
    )

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
            "reviews",
            "amenities",
            "is_published",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"reviews": {"read_only": True}}

    def create(self, validated_data):
        amenities = validated_data.pop("amenities")
        new_property = Property.objects.create(  # pylint: disable=no-member
            **validated_data
        )
        new_property.amenities.set(amenities)
        return new_property

    def update(self, instance, validated_data):
        """Update a property instance."""
        instance.name = validated_data.get("name", instance.name)
        instance.city = validated_data.get("city", instance.city)
        instance.property_type = validated_data.get(
            "property_type", instance.property_type
        )
        instance.location = validated_data.get("location", instance.location)
        instance.street = validated_data.get("street", instance.street)
        instance.number = validated_data.get("number", instance.number)
        instance.is_published = validated_data.get(
            "is_published", instance.is_published
        )
        instance.owner = validated_data.get("owner", instance.owner)

        if "amenities" in validated_data:
            instance.amenities.set(validated_data["amenities"])
        instance.updated_at = timezone.now()
        instance.save()
        return instance


class RoomImageSerializer(serializers.HyperlinkedModelSerializer):
    """Room image serializer."""

    class Meta:
        """Room image serializer."""

        model = RoomImage
        fields = ["id", "url", "room", "image", "created_at", "updated_at"]


class RoomSerializer(serializers.HyperlinkedModelSerializer):
    """
    Room serializer.
    """

    images = RoomImageSerializer(many=True, required=False)
    property = serializers.HyperlinkedRelatedField(
        view_name="property-detail",
        queryset=Property.objects.all(),  # pylint: disable=no-member
    )

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
            "occupied_beds",
            "available_beds",
            "description",
            "price",
            "is_available",
            "display_image",
            "images",
            "created_at",
            "updated_at",
        ]

        extra_kwargs = {"reviews": {"read_only": True}}

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        property_ = validated_data.pop("property")
        name = validated_data.pop("name")
        if Room.objects.filter(  # pylint: disable=no-member
            property=property_, name=name
        ).exists():
            raise serializers.ValidationError(
                "Room with same name already exists in this property"
            )
        try:
            room = Room.objects.create(  # pylint: disable=no-member
                property=property_, name=name, **validated_data
            )
            for image_data in images_data:
                RoomImage.objects.create(  # pylint: disable=no-member
                    room=room, **image_data
                )
            return room
        except ValidationError as e:
            raise serializers.ValidationError(str(e.detail))
        except Exception as e:  # pylint: disable=broad-except
            raise e

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


class LandlordVerificationDocumentSerializer(serializers.ModelSerializer):
    """Landlord verification document serializer."""

    landlord = serializers.HyperlinkedRelatedField(
        write_only=True,
        view_name="landlord-detail",
        queryset=Landlord.objects.all(),  # pylint: disable=no-member
    )

    class Meta:
        """Landlord verification document serializer."""

        model = LandlordVerificationDocument
        fields = ["id", "landlord", "document_type", "document"]


class LandlordVerificationRequestSerializer(serializers.HyperlinkedModelSerializer):
    """Landlord verification request serializer."""

    landlord = serializers.HyperlinkedRelatedField(
        view_name="landlord-detail",
        queryset=Landlord.objects.all(),  # pylint: disable=no-member
    )

    id_card = LandlordVerificationDocumentSerializer()
    title_deed = LandlordVerificationDocumentSerializer()
    utility_bill = LandlordVerificationDocumentSerializer()

    class Meta:
        """Landlord verification request serializer."""

        model = LandlordVerificationRequest
        fields = [
            "id",
            "url",
            "landlord",
            "id_card",
            "title_deed",
            "utility_bill",
            "status",
        ]
