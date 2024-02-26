from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserList, UserDetail, RegisterView, CustomTokenObtainPairView


urlpatterns = [
    path("users/", UserList.as_view(), name="users-list"),
    path("users/<int:pk>/", UserDetail.as_view(), name="user-detail"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
