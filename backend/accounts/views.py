from django.conf import settings
from django.contrib.auth import authenticate
from django.middleware import csrf
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


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


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


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
        data = request.data
        response = Response()
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.is_active:
                data = get_tokens_for_user(user)
                response.set_cookie(
                    key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                    value=data["access"],
                    expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                    secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                    httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                    samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                )
                csrf.get_token(request)
                user_data = User.objects.get(email=email)
                data["id"] = user_data.id
                data["email"] = user_data.email
                data["first_name"] = user_data.first_name
                data["last_name"] = user_data.last_name
                data["is_student"] = user_data.is_student
                data["is_landlord"] = user_data.is_landlord
                response.data = data
                return response
            return Response(
                {"No active": "This account is not active!!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        else:
            return Response(
                {"Invalid": "Invalid username or password!!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
