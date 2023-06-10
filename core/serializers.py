from django.utils import timezone
from rest_framework import serializers
from .models import (
    PropertyImage,
    Student,
    Landlord,
    Institution,
    Booking,
    Property,
    Amenity,
    City,
    Review
    )


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')
    class Meta:
        model = Student
        fields = [
            'id',
            'url',
            'user',
            'institution',
            'bookings',
            'created_at',
            'updated_at',
            'owner'
        ]
        extra_kwargs = {'bookings': {'read_only': True}}
    
    def create(self, validated_data):
        user = validated_data.pop('user')
        student = Student.objects.create(user=user, **validated_data)
        return student
    
    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.institution = validated_data.get('institution', instance.institution)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance
    

class LandlordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Landlord
        fields = ['id', 'url', 'user', 'properties']
        extra_kwargs = {'properties': {'read_only': True}}

    
    def create(self, validated_data):
        user = validated_data.pop('user')
        landlord = Landlord.objects.create(user=user, **validated_data)
        return landlord
    
    def update(self, instance, validated_data):
        properties = validated_data.pop('properties')
        instance.user = validated_data.get('user', instance.user)
        instance.properties = properties
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance


class InstitutionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Institution
        fields = ['id', 'url', 'name', 'city']
    
    def create(self, validated_data):
        institution = Institution.objects.create(**validated_data)
        return institution
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.city = validated_data.get('city', instance.city)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance
    

class BookingSerializer(serializers.HyperlinkedModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = Booking
        fields = [
            'id', 'url', 'student', 'property', 'created_at', 'updated_at'
        ]

    def create(self, validated_data):
        student = validated_data.pop('student')
        property = validated_data.pop('property')
        booking = Booking.objects.create(student=student, property=property, **validated_data)
        return booking
    
    def update(self, instance, validated_data):
        instance.student = validated_data.get('student', instance.student)
        instance.property = validated_data.get('property', instance.property)
        instance.updated_at = timezone.now()
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance
    

class PropertySerializer(serializers.HyperlinkedModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = Property
        fields = [
            'url',
            'id',
            'landlord',
            'name',
            'images',
            'description',
            'city',
            'location',
            'street',
            'number',
            'total_rooms',
            'rooms_single',
            'price_single',
            'price_shared',
            'amenities',
            'reviews',
            'is_published',
            'created_at',
            'updated_at',
        ]
        extra_kwargs = {'reviews': {'read_only': True}, 'images': {'read_only': True}}
    
    def create(self, validated_data):
        amenities = validated_data.pop('amenities')
        landlord = validated_data.pop('landlord')
        property = Property.objects.create(**validated_data)
        property.landlord = landlord
        property.amenities.set(amenities)
        return property
    
    def update(self, instance, validated_data):
        amenities = validated_data.pop('amenities')
        landlord = validated_data.pop('landlord')
        instance.city = validated_data.get('city', instance.city)
        instance.location = validated_data.get('location', instance.location)
        instance.street = validated_data.get('street', instance.street)
        instance.number = validated_data.get('number', instance.number)
        instance.description = validated_data.get('description', instance.description)
        instance.price_single = validated_data.get('price_single', instance.price_single)
        instance.price_shared = validated_data.get('price_shared', instance.price_shared)
        instance.total_rooms = validated_data.get('total_rooms', instance.total_rooms)
        instance.rooms_single = validated_data.get('rooms_single', instance.rooms_single)
        instance.is_published = validated_data.get('is_published', instance.is_published)
        instance.updated_at = timezone.now()
        instance.landlord = landlord
        instance.amenities.set(amenities)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance
    
class PropertyImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'url', 'property', 'image']
    
    def create(self, validated_data):
        property_image = PropertyImage.objects.create(**validated_data)
        return property_image
    
    def update(self, instance, validated_data):
        instance.property = validated_data.get('property', instance.property)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance
    

class AmenitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'url', 'name', 'icon']
    
    def create(self, validated_data):
        amenity = Amenity.objects.create(**validated_data)
        return amenity
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance
    

class CitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'url', 'name']
    

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')
    
    class Meta:
        model = Review
        fields = ['id', 'url', 'property', 'student', 'rating', 'comment', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        property = validated_data.pop('property')
        student = validated_data.pop('student')
        review = Review.objects.create(property=property, student=student, **validated_data)
        return review
    
    def update(self, instance, validated_data):
        instance.property = validated_data.get('property', instance.property)
        instance.student = validated_data.get('student', instance.student)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.updated_at = timezone.now()
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()
        return instance