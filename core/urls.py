from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


urlpatterns = [
    path('students/', views.StudentList.as_view(), name='students-list'),
    path('students/<int:pk>/', views.StudentDetail.as_view(), name='student-detail'),
    path('landlords/', views.LandloardList.as_view(), name='landlords-list'),
    path('landlords/<int:pk>/', views.LandlordDetail.as_view(), name='landlord-detail'),
    path('properties/', views.PropertyList.as_view(), name='properties-list'),
    path('properties/<int:pk>/', views.PropertyDetail.as_view(), name='properties-detail'),
    path('cities/', views.CityList.as_view(), name='cities-list'),
    path('cities/<int:pk>/', views.CityDetail.as_view(), name='city-detail'),
    path('amenities/', views.AmenityList.as_view(), name='amenities-list'),
    path('amenities/<int:pk>/', views.AmenityDetail.as_view(), name='amenity-detail'),
    path('institutions/', views.InstitutionList.as_view(), name='institutions-list'),
    path('institutions/<int:pk>/', views.InstitutionDetail.as_view(), name='institution-detail'),
    path('reviews/', views.ReviewList.as_view(), name='reviews-list'),
    path('reviews/<int:pk>/', views.ReviewDetail.as_view(), name='review-detail'),
    path('bookings/', views.BookingList.as_view(), name='bookings-list'),
    path('bookings/<int:pk>/', views.BookingDetail.as_view(), name='booking-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
