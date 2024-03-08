"""
This module contains the viewsets for the core app.
"""

from django.db import transaction
from django.forms import ValidationError
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
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
from utils.sendmail import sendmail


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
    filterset_fields = ["city__name", "owner__last_name", "amenities__name"]
    search_fields = [
        "name",
        "city__name",
        "location",
        "street",
        "owner__last_name",
    ]
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

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        Override the create method to add the owner to the review.
        """
        data = request.data

        if not request.user.is_student:
            return Response(
                {"detail": "Only students can leave reviews."},
                status=status.HTTP_403_FORBIDDEN,
            )
        try:
            property_ = Property.objects.get(  # pylint: disable=no-member
                id=data["property"]
            )

            if Review.objects.filter(  # pylint: disable=no-member
                owner=request.user, property=property_
            ).exists():
                return Response(
                    {"detail": "You have already left a review for this property."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not Booking.objects.filter(  # pylint: disable=no-member
                owner=request.user, room__property=property_
            ).exists():
                return Response(
                    {
                        "detail": "You cannot review a property that you have not booked before."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            review = Review.objects.create(  # pylint: disable=no-member
                owner=request.user,
                property=property_,
                comment=data["comment"],
                rating=data["rating"],
            )
            return Response(
                ReviewSerializer(review, context={"request": request}).data,
                status=status.HTTP_201_CREATED,
            )
        except Property.DoesNotExist:  # pylint: disable=no-member
            return Response(
                {"detail": "Property does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:  # pylint: disable=broad-except
            return Response(
                {"detail": "Something went wrong."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class BookingViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Booking.objects.all()  # pylint: disable=no-member
    serializer_class = BookingSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        Override the create method to add the student to the booking.
        """
        booking = None
        data = request.data
        room_id = request.data.get("room")
        room = Room.objects.select_related(  # pylint: disable=no-member
            "property", "property__owner"
        ).get(id=room_id)
        try:

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
                room.clean()
                room.save()
                sendmail(
                    subject="Booking Confirmation",
                    recipient_list=[request.user.email],
                    message=f"Your booking has been confirmed for {room.name} at \
                        {room.property.name} on {booking.start_date} to {booking.end_date}. \
                        The property is located at {room.property.location}, {room.property.street}, \
                        {room.property.number}. Thank you for using our service.",
                )
                sendmail(
                    subject="Booking Confirmation",
                    recipient_list=[room.property.owner.email],
                    message=f"Your room ({room.name} at {room.property.name}) has been booked from \
                        {booking.start_date} to {booking.end_date} by {request.user.first_name} \
                        {request.user.last_name}.",
                )
                serializer = BookingSerializer(booking, context={"request": request})
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(
                {"detail": "Room is already full"}, status=status.HTTP_400_BAD_REQUEST
            )
        except ValidationError as e:
            return Response(e.message, status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:  # pylint: disable=no-member
            return Response(
                {"detail": "Room does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Property.DoesNotExist:  # pylint: disable=no-member
            return Response(
                {"detail": "Property does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:  # pylint: disable=broad-except
            return Response(
                {"detail": "Something went wrong during the booking process."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def destroy(self, request, *args, **kwargs):
        """
        Override the destroy method to update the room availability.
        """
        instance = self.get_object()
        room_id = request.data.get("room")
        room = Room.objects.select_related(  # pylint: disable=no-member
            "property", "property__owner"
        ).get(id=room_id)
        if instance.status not in ["pending", "approved"]:
            return Response(
                {"detail": "Booking cannot be cancelled from its current state."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            room.occupied_beds -= 1
            room.available_beds += 1
            if room.available_beds > 0:
                room.is_available = True
            room.clean()
            room.save()
            instance.status = "cancelled"
            instance.save()
            sendmail(
                subject="Booking Cancelled",
                recipient_list=[instance.owner.email],
                message=f"Your booking for {room.name} at {room.property.name} has been cancelled.",
            )
            sendmail(
                subject="Booking Cancelled",
                recipient_list=[room.property.owner.email],
                message=f"Your room ({room.name} at {room.property.name}) has been cancelled.",
            )
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ValidationError as e:
            return Response(e.message, status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:  # pylint: disable=no-member
            return Response(
                {"detail": "Room does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Property.DoesNotExist:  # pylint: disable=no-member
            return Response(
                {"detail": "Property does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:  # pylint: disable=broad-except
            return Response(
                {"detail": "Something went wrong during the cancellation process."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        """
        Override the update method to update the room availability.
        """
        data = request.data
        instance = self.get_object()
        room_id = request.data.get("room")
        room = Room.objects.select_related(  # pylint: disable=no-member
            "property", "property__owner"
        ).get(id=room_id)
        try:
            if data.get("status") in ["cancelled", "rejected"]:
                room.occupied_beds -= 1
                room.available_beds += 1
                if room.available_beds > 0:
                    room.is_available = True
                room.clean()
                room.save()
                instance.status = data["status"]
                instance.save()
                sendmail(
                    subject="Booking Status",
                    recipient_list=[instance.owner.email],
                    message=f"Your booking for {room.name} at {room.property.name} \
                        has been {data['status'].title()}.",
                )
                sendmail(
                    subject="Booking Status",
                    recipient_list=[room.property.owner.email],
                    message=f"Your room ({room.name} at {room.property.name}) \
                        has been {data['status'].title()}.",
                )
                return Response(status=status.HTTP_204_NO_CONTENT)
            return super().update(request, *args, **kwargs)
        except ValidationError as e:
            return Response(e.message, status=status.HTTP_400_BAD_REQUEST)
        except Room.DoesNotExist:  # pylint: disable=no-member
            return Response(
                {"detail": "Room does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Property.DoesNotExist:  # pylint: disable=no-member
            return Response(
                {"detail": "Property does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:  # pylint: disable=broad-except
            return Response(
                {"detail": "Something went wrong during the booking update process."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class RoomViewSet(ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    search_fields = [
        "name",
        "property__city__name",
        "property__name",
        "property__location",
        "property__street",
        "property__owner__last_name",
    ]
    filterset_fields = [
        "name",
        "property__city__name",
        "num_beds",
        "price",
        "available_beds",
        "is_available",
        "room_type",
        "property__amenities__name",
    ]
    queryset = Room.objects.all()  # pylint: disable=no-member
    serializer_class = RoomSerializer
