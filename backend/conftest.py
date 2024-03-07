import pytest
from pytest_factoryboy import register
from tests.factories import (
    UserFactory,
    AmenityFactory,
    CityFactory,
    InstitutionFactory,
    LandlordFactory,
    StudentFactory,
    PropertyFactory,
    BookingFactory,
    ReviewFactory,
    RoomFactory,
    RoomImageFactory,
)

register(UserFactory)
register(AmenityFactory)
register(CityFactory)
register(InstitutionFactory)
register(LandlordFactory)
register(StudentFactory)
register(PropertyFactory)
register(BookingFactory)
register(ReviewFactory)
register(RoomFactory)
register(RoomImageFactory)


@pytest.fixture
def base_user(db, user_factory):
    return user_factory.create()


@pytest.fixture
def student_user(db, user_factory):
    return user_factory.create(is_student=True)


@pytest.fixture
def landlord_user(db, user_factory):
    return user_factory.create(is_landlord=True)


@pytest.fixture
def admin_user(db, user_factory):
    return user_factory.create(is_superuser=True)


@pytest.fixture
def amenity(db, amenity_factory):
    return amenity_factory.create()


@pytest.fixture
def city(db, city_factory):
    return city_factory.create()


@pytest.fixture
def institution(db, institution_factory):
    return institution_factory.create()


@pytest.fixture
def landlord(db, landlord_factory):
    return landlord_factory.create()


@pytest.fixture
def student(db, student_factory):
    return student_factory.create()


@pytest.fixture
def property(db, property_factory):
    return property_factory.create()


@pytest.fixture
def booking(db, booking_factory):
    new_booking = booking_factory.create()
    print(f"Created booking with owner email: {new_booking.owner.email}")
    return new_booking


@pytest.fixture
def room(db, room_factory):
    return room_factory.create()


@pytest.fixture
def room_image(db, room_image_factory):
    return room_image_factory.create()


@pytest.fixture
def review(db, review_factory):
    return review_factory.create()
