import factory
from factory.django import DjangoModelFactory
from django.db.models.signals import post_save
from faker import Faker
from accounts.models import User
from core.models import (
    Amenity,
    Room,
    RoomImage,
    Booking,
    Review,
    Property,
    Student,
    Landlord,
    City,
    Institution,
)

faker = Faker()


@factory.django.mute_signals(post_save)
class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Faker("email")
    first_name = faker.name()
    last_name = faker.name()
    password = faker.password()
    phone = faker.phone_number()
    avatar = faker.url()
    is_student = False
    is_landlord = False
    is_admin = False
    is_active = True

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        manager = cls._get_manager(model_class)
        if "is_superuser" in kwargs and kwargs["is_superuser"] is True:
            return manager.create_superuser(*args, **kwargs)
        elif "is_landlord" in kwargs and kwargs["is_landlord"] is True:
            return manager.create_landlord(*args, **kwargs)
        elif "is_student" in kwargs and kwargs["is_student"] is True:
            return manager.create_student(*args, **kwargs)

        return manager.create_user(*args, **kwargs)


class AmenityFactory(DjangoModelFactory):
    class Meta:
        model = Amenity

    name = faker.word()


class CityFactory(DjangoModelFactory):
    class Meta:
        model = City

    name = faker.city()


class InstitutionFactory(DjangoModelFactory):
    class Meta:
        model = Institution

    name = faker.company()
    city = factory.SubFactory(CityFactory)


class LandlordFactory(DjangoModelFactory):
    class Meta:
        model = Landlord

    user = factory.SubFactory(UserFactory)
    address = faker.address()
    city = factory.SubFactory(CityFactory)
    preferred_payment_method = "ecocash"
    bank_name = faker.word()
    account_name = faker.name()
    account_number = faker.random_number()
    ecocash_number = faker.phone_number()
    is_verified = False


class StudentFactory(DjangoModelFactory):
    class Meta:
        model = Student

    user = factory.SubFactory(UserFactory)
    institution = factory.SubFactory(InstitutionFactory)
    registration_number = faker.random_number()
    program = faker.word()
    level = faker.random_number()


class PropertyFactory(DjangoModelFactory):
    class Meta:
        model = Property

    owner = factory.SubFactory(UserFactory)
    name = factory.Faker("word")
    location = factory.Faker("address")
    city = factory.SubFactory(CityFactory)
    street = factory.Faker("street_name")
    number = factory.Faker("random_number")
    is_published = True

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        manager = cls._get_manager(model_class)
        new_property = manager.create(*args, **kwargs)
        new_property.amenities.add(AmenityFactory.create())

        return new_property


class RoomFactory(DjangoModelFactory):
    class Meta:
        model = Room

    property = factory.SubFactory(PropertyFactory)
    name = factory.Faker("word")
    room_type = "dormitory"
    num_beds = 6
    occupied_beds = 0
    price = 100
    description = factory.Faker("text")
    display_image = factory.Faker("image_url")
    is_available = True


class RoomImageFactory(DjangoModelFactory):
    class Meta:
        model = RoomImage

    room = factory.SubFactory(RoomFactory)
    image = factory.Faker("image_url")


class BookingFactory(DjangoModelFactory):
    class Meta:
        model = Booking

    owner = factory.SubFactory(UserFactory)
    room = factory.SubFactory(RoomFactory)
    start_date = factory.Faker("date_this_year")
    end_date = factory.Faker("date_this_year")
    status = "pending"


class ReviewFactory(DjangoModelFactory):
    class Meta:
        model = Review

    owner = factory.SubFactory(UserFactory)
    property = factory.SubFactory(PropertyFactory)
    rating = factory.Faker("random_number")
    comment = factory.Faker("text")
