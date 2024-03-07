import pytest
from rest_framework.test import APIRequestFactory

from core.serializers import (
    RoomSerializer,
    StudentSerializer,
    LandlordSerializer,
    PropertySerializer,
    ReviewSerializer,
    AmenitySerializer,
    CitySerializer,
    InstitutionSerializer,
)

factory = APIRequestFactory()


@pytest.mark.django_db
def test_institution_serializer(institution):
    """Test the institution serializer."""
    request = factory.get("http://server.com/api/institutions/")
    serializer = InstitutionSerializer(institution, context={"request": request})
    assert serializer.data["name"] == institution.name


@pytest.mark.django_db
def test_institution_serializer_update(institution):
    """Test the institution serializer."""
    request = factory.put("http://server.com/api/institutions/1/", {})
    serializer = InstitutionSerializer(institution, context={"request": request})
    serializer.update(institution, {"name": "New Name"})
    assert serializer.data["name"] == "New Name"


@pytest.mark.django_db
def test_institution_serializer_create(institution):
    """Test the institution serializer."""
    request = factory.post("http://server.com/api/institutions/", {})
    serializer = InstitutionSerializer(institution, context={"request": request})
    assert serializer.data["name"] == institution.name


@pytest.mark.django_db
def test_city_serializer(city):
    """Test the city serializer."""
    request = factory.get("http://server.com/api/cities/")
    serializer = CitySerializer(city, context={"request": request})
    assert serializer.data["name"] == city.name


@pytest.mark.django_db
def test_city_serializer_update(city):
    """Test the city serializer."""
    request = factory.put("http://server.com/api/cities/1/", {})
    serializer = CitySerializer(city, context={"request": request})
    serializer.update(city, {"name": "New Name"})
    assert serializer.data["name"] == "New Name"


@pytest.mark.django_db
def test_city_serializer_create(city):
    """Test the city serializer."""
    request = factory.post("http://server.com/api/cities/", {})
    serializer = CitySerializer(city, context={"request": request})
    assert serializer.data["name"] == city.name


@pytest.mark.django_db
def test_property_serializer(property):
    """Test the property serializer."""
    request = factory.get("http://server.com/api/properties/")
    serializer = PropertySerializer(property, context={"request": request})
    assert serializer.data["name"] == property.name


@pytest.mark.django_db
def test_property_serializer_update(property, base_user):
    """Test the property serializer."""
    user = base_user
    request = factory.put("http://server.com/api/properties/1/", {})
    serializer = PropertySerializer(property, context={"request": request})
    serializer.update(property, {"name": "New Name", "owner": user})
    assert serializer.data["name"] == "New Name"
    assert serializer.data["owner"] == user.id


@pytest.mark.django_db
def test_property_serializer_create(property):
    """Test the property serializer."""
    request = factory.post("http://server.com/api/properties/", {})
    serializer = PropertySerializer(property, context={"request": request})
    assert serializer.data["name"] == property.name


@pytest.mark.django_db
def test_room_serializer(room):
    """Test the room serializer."""
    request = factory.get("http://server.com/api/rooms/")
    serializer = RoomSerializer(room, context={"request": request})
    assert serializer.data["num_beds"] == room.num_beds


@pytest.mark.django_db
def test_room_serializer_update(room):
    """Test the room serializer."""
    request = factory.put("http://server.com/api/rooms/1/", {})
    serializer = RoomSerializer(room, context={"request": request})
    serializer.update(room, {"num_beds": 5})
    assert serializer.data["num_beds"] == 5


@pytest.mark.django_db
def test_room_serializer_create(room):
    """Test the room serializer."""
    request = factory.post("http://server.com/api/rooms/", {})
    serializer = RoomSerializer(room, context={"request": request})
    assert serializer.data["num_beds"] == room.num_beds


@pytest.mark.django_db
def test_student_serializer(student):
    """Test the student serializer."""
    request = factory.get("http://server.com/api/students/")
    serializer = StudentSerializer(student, context={"request": request})
    assert serializer.data["program"] == student.program


@pytest.mark.django_db
def test_student_serializer_update(student, institution):
    """Test the student serializer."""
    request = factory.put("http://server.com/api/students/1/", {})
    serializer = StudentSerializer(student, context={"request": request})
    serializer.update(student, {"institution": institution})
    assert (
        serializer.data["institution"]
        == InstitutionSerializer(institution, context={"request": request}).data["url"]
    )


@pytest.mark.django_db
def test_student_serializer_create(student):
    """Test the student serializer."""
    request = factory.post("http://server.com/api/students/", {})
    serializer = StudentSerializer(student, context={"request": request})
    assert serializer.data["program"] == student.program


@pytest.mark.django_db
def test_landlord_serializer(landlord):
    """Test the landlord serializer."""
    request = factory.get("http://server.com/api/landlords/")
    serializer = LandlordSerializer(landlord, context={"request": request})
    assert serializer.data["address"] == landlord.address


@pytest.mark.django_db
def test_landlord_serializer_update(landlord):
    """Test the landlord serializer."""
    request = factory.put("http://server.com/api/landlords/1/", {})
    serializer = LandlordSerializer(landlord, context={"request": request})
    serializer.update(landlord, {"preferred_payment_method": "bank transfer"})
    assert serializer.data["preferred_payment_method"] == "bank transfer"


@pytest.mark.django_db
def test_landlord_serializer_create(landlord):
    """Test the landlord serializer."""
    request = factory.post("http://server.com/api/landlords/", {})
    serializer = LandlordSerializer(landlord, context={"request": request})
    assert serializer.data["address"] == landlord.address


@pytest.mark.django_db
def test_amenity_serializer(amenity):
    """Test the amenity serializer."""
    request = factory.get("http://server.com/api/amenities/")
    serializer = AmenitySerializer(amenity, context={"request": request})
    assert serializer.data["name"] == amenity.name


@pytest.mark.django_db
def test_amenity_serializer_update(amenity):
    """Test the amenity serializer."""
    request = factory.put("http://server.com/api/amenities/1/", {})
    serializer = AmenitySerializer(amenity, context={"request": request})
    serializer.update(amenity, {"name": "New Name"})
    assert serializer.data["name"] == "New Name"


@pytest.mark.django_db
def test_amenity_serializer_create(amenity):
    """Test the amenity serializer."""
    request = factory.post("http://server.com/api/amenities/", {})
    serializer = AmenitySerializer(amenity, context={"request": request})
    assert serializer.data["name"] == amenity.name


@pytest.mark.django_db
def test_review_serializer(review):
    """Test the review serializer."""
    request = factory.get("http://server.com/api/reviews/")
    serializer = ReviewSerializer(review, context={"request": request})
    assert serializer.data["rating"] == review.rating


@pytest.mark.django_db
def test_review_serializer_update(review):
    """Test the review serializer."""
    request = factory.put("http://server.com/api/reviews/1/", {})
    serializer = ReviewSerializer(review, context={"request": request})
    serializer.update(review, {"comment": "This is a nice property"})
    assert serializer.data["comment"] == "This is a nice property"


@pytest.mark.django_db
def test_review_serializer_create(review):
    """Test the review serializer."""
    request = factory.post("http://server.com/api/reviews/", {})
    serializer = ReviewSerializer(review, context={"request": request})
    assert serializer.data["rating"] == review.rating
