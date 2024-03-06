import pytest
from rest_framework import serializers
from accounts.serializers import RegisterSerializer
from accounts.models import User


class TestRegisterSerializer:
    """Serializes User model instances into JSON format and vice versa."""

    @pytest.mark.django_db
    def test_serialization(self):
        """Test serialization and deserialization of a User object."""

        serializer = RegisterSerializer()
        user = serializer.create(
            {
                "first_name": "John",
                "last_name": "Doe",
                "email": "johndoe@example.com",
                "password": "password123",
                "password2": "password123",
                "is_student": True,
                "is_landlord": False,
            }
        )

        serialized_data = RegisterSerializer(user).data

        deserialized_data = User(**serialized_data)

        assert deserialized_data.get_short_name() == user.get_short_name()

    @pytest.mark.django_db
    def test_password_required(self):
        """Test that the password is required."""

        user_data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.com",
            "password": "password",
            "password2": "password",
            "is_student": True,
            "is_landlord": False,
        }
        serializer = RegisterSerializer(data=user_data)

        with pytest.raises(serializers.ValidationError):
            serializer.is_valid(raise_exception=True)

    def test_password_fields_match(self):
        """Test that the password fields match."""

        serializer = RegisterSerializer()
        attrs = {"password": "password123", "password2": "password123"}
        validated_attrs = serializer.validate(attrs)
        assert validated_attrs == attrs

    def test_password_fields_do_not_match(self):
        """Test that the password fields do not match."""

        serializer = RegisterSerializer()
        attrs = {"password": "password123", "password2": "differentpassword"}
        with pytest.raises(serializers.ValidationError):
            serializer.validate(attrs)

    @pytest.mark.django_db
    def test_create_new_user_with_valid_data(self):
        """Test creating a new user with valid data."""

        serializer = RegisterSerializer()
        validated_data = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "password123",
            "password2": "password123",
            "is_student": True,
            "is_landlord": False,
        }

        user = serializer.create(validated_data)

        assert user.email == "test@example.com"
        assert user.first_name == "John"
        assert user.last_name == "Doe"
        assert user.is_student
        assert not user.is_landlord

    @pytest.mark.django_db
    def test_create_new_user_with_minimum_data(self):
        """Create a new user with the minimum required data."""

        serializer = RegisterSerializer()
        validated_data = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "password123",
            "password2": "password123",
        }

        user = serializer.create(validated_data)

        assert user.email == "test@example.com"
        assert user.first_name == "John"
        assert user.last_name == "Doe"
        assert not user.is_student
        assert not user.is_landlord

    @pytest.mark.django_db
    def test_create_new_user_with_long_password(self):
        """Attempt to create a new user with a password that is too long."""

        validated_data = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "a" * 129,
            "password2": "a" * 129,
            "is_student": True,
            "is_landlord": False,
        }
        serializer = RegisterSerializer(data=validated_data)
        with pytest.raises(serializers.ValidationError):
            serializer.is_valid(raise_exception=True)

    @pytest.mark.django_db
    def test_create_new_user_with_invalid_email(self):
        """Attempt to create a new user with an invalid email."""

        validated_data = {
            "email": "invalid_email",
            "first_name": "John",
            "last_name": "Doe",
            "password": "password123",
            "password2": "password123",
            "is_student": True,
            "is_landlord": False,
        }
        serializer = RegisterSerializer(data=validated_data)
        with pytest.raises(serializers.ValidationError):
            serializer.is_valid(raise_exception=True)

    @pytest.mark.django_db
    def test_create_new_user_with_invalid_password(self):
        """Attempt to create a new user with an invalid password."""

        validated_data = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "password",
            "password2": "password",
            "is_student": True,
            "is_landlord": False,
        }
        serializer = RegisterSerializer(data=validated_data)
        with pytest.raises(serializers.ValidationError):
            serializer.is_valid(raise_exception=True)

    @pytest.mark.django_db
    def test_create_new_user_with_short_password(self):
        """Attempt to create a new user with a password that is too short."""

        validated_data = {
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password": "pass",
            "password2": "pass",
            "is_student": True,
            "is_landlord": False,
        }
        serializer = RegisterSerializer(data=validated_data)
        with pytest.raises(serializers.ValidationError):
            serializer.is_valid(raise_exception=True)
