"""
Serializers for the core app.
"""

from rest_framework import serializers
from accounts.serializers import UserSerializer
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
        depth = 1
        extra_kwargs = {"bookings": {"read_only": True}}

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

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["user"] = UserSerializer(instance.user, context=self.context).data
        return ret


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
        depth = 1

    def update(self, instance, validated_data):
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

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["user"] = UserSerializer(instance.user, context=self.context).data
        return ret


class InstitutionSerializer(serializers.HyperlinkedModelSerializer):
    """Institution serializer."""

    class Meta:
        """Institution serializer."""

        model = Institution
        fields = ["id", "url", "name", "city"]
        depth = 1

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
        depth = 1

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["owner"] = UserSerializer(instance.owner, context=self.context).data
        return ret


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
        depth = 1

        extra_kwargs = {"reviews": {"read_only": True}}

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["property"] = PropertySerializer(
            instance.property, context=self.context
        ).data
        return ret


class PropertySerializer(serializers.HyperlinkedModelSerializer):
    """Property serializer."""

    reviews = serializers.HyperlinkedRelatedField(
        view_name="review-detail", read_only=True, many=True
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

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["owner"] = UserSerializer(instance.owner, context=self.context).data
        ret["reviews"] = ReviewSerializer(
            instance.reviews, many=True, context=self.context
        ).data
        ret["amenities"] = AmenitySerializer(
            instance.amenities, many=True, context=self.context
        ).data
        ret["city"] = CitySerializer(instance.city, context=self.context).data
        return ret


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

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["owner"] = UserSerializer(instance.owner, context=self.context).data
        return ret


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
        depth = 1
