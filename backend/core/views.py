"""
This module contains the viewsets for the core app.
"""

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
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
        booking = None
        data = request.data
        room_id = request.data.get("room")
        room = Room.objects.get(id=room_id)  # pylint: disable=no-member

        if room.is_available:
            booking = Booking.objects.create(  # pylint: disable=no-member
                owner=request.user,
                room=room,
                start_date=data["start_date"],
                end_date=data["end_date"],
            )
            room.occupied_beds += 1
            room.available_beds -= 1
            if room.available_beds == 0:
                room.is_available = False
            room.save()
            return Response(booking, status=status.HTTP_201_CREATED)
        return Response(
            {"detail": "Room is already full"}, status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        """
        Override the destroy method to update the room availability.
        """
        instance = self.get_object()
        room = instance.room
        room.occupied_beds -= 1
        room.available_beds += 1
        if room.available_beds > 0:
            room.is_available = True
        room.save()
        instance.status = "cancelled"
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        """
        Override the update method to update the room availability.
        """
        data = request.data
        instance = self.get_object()
        room = instance.room
        if data.get("status") == "cancelled" or data.get("status") == "rejected":
            room.occupied_beds -= 1
            room.available_beds += 1
            if room.available_beds > 0:
                room.is_available = True
            room.save()
        return super().update(request, *args, **kwargs)


class RoomViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Room.objects.all()  # pylint: disable=no-member
    serializer_class = RoomSerializer
