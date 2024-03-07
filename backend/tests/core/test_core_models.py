from django.forms import ValidationError
import pytest


@pytest.mark.django_db
def test_amenities_str(amenity):
    """Test the string representation of an amenity."""
    assert str(amenity) == amenity.name


@pytest.mark.django_db
def test_city_str(city):
    """Test the string representation of a city."""
    assert str(city) == city.name


@pytest.mark.django_db
def test_landlord_str(landlord):
    """Test the string representation of a landlord."""
    assert str(landlord) == str(landlord.user)


@pytest.mark.django_db
def test_institution_str(institution):
    """Test the string representation of an institution."""
    assert str(institution) == institution.name + " - " + institution.city.name


@pytest.mark.django_db
def test_property_str(property):
    """Test the string representation of a property."""
    assert str(property) == property.name


@pytest.mark.django_db
def test_room_str(room):
    """Test the string representation of a room."""
    assert str(room) == room.name + " - " + str(room.property)


@pytest.mark.django_db
def test_room_save_first(room):
    """Test the save method of a room on first creation that available beds is equal to total number of beds."""
    room.save()
    assert room.available_beds == room.num_beds
    assert room.is_available


def test_room_save_second(room):
    """Test the save method of a room on update that available beds is equal to total number of beds minus occupied beds."""
    room.save()
    assert room.available_beds == room.num_beds - room.occupied_beds


@pytest.mark.django_db
def test_room_clean(room):
    """Test the clean method of a room that available and occupied beds are equal to total number of beds."""
    room.clean()
    assert room.available_beds == room.num_beds - room.occupied_beds


@pytest.mark.django_db
def test_room_clean_with_occupied_beds_more_than_total_number_of_beds(room):
    """Test the clean method of a room when occupied beds are more than total number of beds."""
    room.occupied_beds = room.num_beds + 1
    with pytest.raises(ValidationError):
        room.clean()


@pytest.mark.django_db
def test_room_clean_with_available_beds_more_than_total_number_of_beds(room):
    """Test the clean method of a room when available beds are more than total number of beds."""
    room.available_beds = room.num_beds + 1
    with pytest.raises(ValidationError):
        room.clean()


@pytest.mark.django_db
def test_room_clean_with_occupied_beds_and_available_beds_more_than_total_number_of_beds(
    room,
):
    """Test the clean method of a room when occupied and available beds are more than total number of beds."""
    room.occupied_beds = room.num_beds
    room.available_beds = room.num_beds
    with pytest.raises(ValidationError):
        room.clean()


@pytest.mark.django_db
def test_room_clean_with_occupied_beds_and_available_beds_equal_to_total_number_of_beds(
    room,
):
    """Test the clean method of a room when occupied and available beds are equal to total number of beds."""
    room.occupied_beds = room.num_beds - room.available_beds
    room.available_beds = room.num_beds - room.occupied_beds
    room.clean()
    room.save()

    assert room.available_beds == room.num_beds


@pytest.mark.django_db
def test_room_clean_with_occupied_beds_and_available_beds_less_than_total_number_of_beds(
    room,
):
    """Test the clean method of a room when occupied and available beds are less than total number of beds."""
    room.occupied_beds = room.num_beds - room.available_beds - 1
    room.available_beds = room.num_beds - room.occupied_beds
    with pytest.raises(ValidationError):
        room.clean()


@pytest.mark.django_db
def test_room_clean_with_occupied_beds_and_available_beds_zero(room):
    """Test the clean method of a room when occupied and available beds are zero."""
    room.occupied_beds = 0
    room.available_beds = 0
    with pytest.raises(ValidationError):
        room.clean()


@pytest.mark.django_db
def test_room_clean_with_occupied_beds_and_available_beds_negative(room):
    """Test the clean method of a room when occupied and available beds are negative."""
    room.occupied_beds = -1
    room.available_beds = -1
    with pytest.raises(ValidationError):
        room.clean()


@pytest.mark.django_db
def test_room_save_method_with_occupied_beds_equal_to_total_number_of_beds(room):
    """Test the save method of a room when occupied beds are equal to total number of beds."""
    room.occupied_beds = room.num_beds
    room.save()
    assert room.available_beds == 0
    assert not room.is_available


@pytest.mark.django_db
def test_room_image_str(room_image):
    """Test the string representation of a room image."""
    assert str(room_image) == str(room_image.room)


@pytest.mark.django_db
def test_review_str(review):
    """Test the string representation of a review."""
    assert str(review) == str(review.owner) + " - " + str(review.property)


@pytest.mark.django_db
def test_booking_str(booking):
    """Test the string representation of a booking."""
    assert str(booking) == str(booking.owner) + " - " + str(booking.room)


@pytest.mark.django_db
def test_student_str(student):
    """Test the string representation of a student."""
    assert str(student) == str(student.user) + " - " + str(student.registration_number)
