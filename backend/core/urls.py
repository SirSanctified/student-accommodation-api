from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"students", views.StudentViewSet)
router.register(r"landlords", views.LandlordViewSet)
router.register(r"properties", views.PropertyViewSet)
router.register(r"cities", views.CityViewSet)
router.register(r"institutions", views.InstitutionViewSet)
router.register(r"amenities", views.AmenityViewSet)
router.register(r"bookings", views.BookingViewSet)

urlpatterns = router.urls
