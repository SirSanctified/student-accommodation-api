"""
This module contains the viewsets for the core app.
"""

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from core.permissions import IsOwnerOrReadOnly
from .serializers import (
    StudentSerializer,
    LandlordSerializer,
    PropertySerializer,
    AmenitySerializer,
    CitySerializer,
    ReviewSerializer,
    BookingSerializer,
    InstitutionSerializer,
    RoomSerializer,
)
from .models import (
    Student,
    Landlord,
    Property,
    City,
    Institution,
    Amenity,
    Review,
    Booking,
    Room,
    RoomImage,
)


class StudentViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Student.objects.all()  # pylint: disable=no-member
    serializer_class = StudentSerializer


class LandlordViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Landlord.objects.all()  # pylint: disable=no-member
    serializer_class = LandlordSerializer


class PropertyViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Property.objects.all()  # pylint: disable=no-member
    serializer_class = PropertySerializer


class CityViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None
    queryset = City.objects.all()  # pylint: disable=no-member
    serializer_class = CitySerializer


class InstitutionViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None
    queryset = Institution.objects.all()  # pylint: disable=no-member
    serializer_class = InstitutionSerializer


class AmenityViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Amenity.objects.all()  # pylint: disable=no-member
    serializer_class = AmenitySerializer


class ReviewViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsOwnerOrReadOnly]
    queryset = Review.objects.all()  # pylint: disable=no-member
    serializer_class = ReviewSerializer


class BookingViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Booking.objects.all()  # pylint: disable=no-member
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        """
        Override the create method to add the student to the booking.
        """
        # TODO: Add the student to the booking, make sure the room availability
        # and occupied beds are updated
        request.data["student"] = request.user.id
        return super().create(request, *args, **kwargs)


class RoomViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Room.objects.all()  # pylint: disable=no-member
    serializer_class = RoomSerializer
