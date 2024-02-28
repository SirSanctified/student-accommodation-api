from django.conf import settings
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken


from .serializers import UserSerializer, RegisterSerializer
from .models import User


class UserList(generics.ListAPIView):
    """
    List all users.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user instance.
    """

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class RegisterView(generics.CreateAPIView):
    """
    Register a new user.
    """

    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# override the default token obtain view
class CustomTokenObtainPairView(TokenObtainPairView, APIView):
    """
    Custom token obtain pair view.
    """

    def post(self, request: Request, *args, **kwargs) -> Response:
        """
        A function that handles the POST request, sets a cookie, and returns a response.

        Args:
            request (Request): The request object.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: The response object.
        """
        response = super().post(request, *args, **kwargs)
        access_token = response.data["access"]
        token = AccessToken(access_token)
        user_id = token.payload["user_id"]
        user = User.objects.get(id=user_id)
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=access_token,
            domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
            path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )
        response.data["first_name"] = user.first_name
        response.data["last_name"] = user.last_name
        response.data["email"] = user.email
        response.data["id"] = user.id
        return response
