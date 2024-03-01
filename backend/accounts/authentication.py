"""
Custom authentication class. Extends the JWTAuthentication class and overrides
the authenticate method to enforce CSRF.
"""

from django.conf import settings

from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions
from rest_framework_simplejwt.authentication import JWTAuthentication


def enforce_csrf(request):
    """
    Enforce CSRF validation.
    """

    def dummy_get_response(request):  # pylint disable=unused-argument
        return None

    check = CSRFCheck(get_response=dummy_get_response)
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        raise exceptions.PermissionDenied(f"CSRF Failed: {reason}")


class CustomAuthentication(JWTAuthentication):
    """Custom authentication class"""

    def authenticate(self, request):
        """
        Authenticates the request and returns the user and validated token.

        :param request: The request object
        :return: Returns the user and validated token if authentication is successful,
        otherwise returns None
        """
        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"]) or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        enforce_csrf(request)
        print("I am here")
        return self.get_user(validated_token), validated_token
