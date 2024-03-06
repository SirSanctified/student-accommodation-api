from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model


User = get_user_model()

username_field = User.USERNAME_FIELD if hasattr(User, "USERNAME_FIELD") else "username"


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the User model.

    This serializer is used to convert User model instances into JSON format
    and vice versa. It is used in the Django REST Framework to handle
    serialization and deserialization of User objects.

    Attributes:
        model (class): The User model class that this serializer is associatedwith.
        fields (list): The fields that should be included in the serialized representation of
        a User object.

    """

    class Meta:
        """
        The Meta class is used as a configuration class for the UserSerializer.
        It provides metadata about the serialization process and defines the
        model and fields to be included in the serialized representation of a User object.

        Attributes:
            model (class): The User model class that this serializer is associated
            with.
            fields (list): The fields that should be included in the serialized representation
            of a User object.

        """

        model = User
        fields = [
            "id",
            "url",
            username_field,
            "first_name",
            "last_name",
            "avatar",
            "phone",
            "is_active",
            "is_student",
            "is_landlord",
        ]


# serializer to register user
class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.

    This serializer is used to convert User model instances into JSON format and vice versa.
    It is used in the Django REST Framework to handle serialization and deserialization of User
    objects.

    Attributes:
        model (class): The User model class that this serializer is associated with.
        fields (list): The fields that should be included in the serialized representation of a
        User object.

    """

    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        """
        The Meta class is used as a configuration class for the UserSerializer.
        It provides metadata about the serialization process and defines the model and fields to
        be included in the serialized representation of a User object.

        Attributes:
            model (class): The User model class that this serializer is associated with.
            fields (list): The fields that should be included in the serialized representation
            of a User object.

        """

        model = User
        fields = (
            "first_name",
            "last_name",
            "email",
            "password",
            "password2",
            "is_student",
            "is_landlord",
        )
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, attrs):
        """
        Validate the input attributes to ensure that the password fields match.
        Validate the input attributes to ensure that the passwoeds are strong enough.

        Parameters:
            self: the instance of the class
            attrs: a dictionary containing the attributes to be validated

        Returns:
            attrs: the validated attributes
        """

        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        """
        Create a new user using the validated data.

        Args:
            validated_data: A dictionary containing the validated user data.

        Returns:
            The newly created user.
        """
        user = User.objects.create(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            is_student=validated_data.get("is_student") or False,
            is_landlord=validated_data.get("is_landlord") or False,
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
