from rest_framework.test import APITestCase
from rest_framework import status


USERS_URL = "/api/auth/users/"


class TestUser(APITestCase):
    """Test for the user views."""

    def test_get_users(self):
        """Test getting all users"""
        response = self.client.get(USERS_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_register_user(self):
        """Test creating a new user"""
        data = {
            "email": "testemail@gmail.com",
            "password": "testpassword",
            "password2": "testpassword",
            "first_name": "testfirst",
            "last_name": "testlast",
        }
        response = self.client.post("/api/auth/register/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertContains(
            response, text="testemail@gmail.com", status_code=status.HTTP_201_CREATED
        )

    def test_get_user(self):
        """Test getting a single user that doesn't exist by id"""
        response = self.client.get(USERS_URL + "1/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_login_success(self):
        """Test logging in"""
        data = {
            "email": "testemail@gmail.com",
            "password": "testpassword",
            "password2": "testpassword",
            "first_name": "testfirst",
            "last_name": "testlast",
        }
        self.client.post("/api/auth/register/", data)
        response = self.client.post(
            "/api/auth/login/",
            {"email": "testemail@gmail.com", "password": "testpassword"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_fail_with_wrong_password(self):
        """Test logging in"""
        data = {
            "email": "testemail@gmail.com",
            "password": "testpassword",
            "password2": "testpassword",
            "first_name": "testfirst",
            "last_name": "testlast",
        }
        self.client.post("/api/auth/register/", data)
        response = self.client.post(
            "/api/auth/login/",
            {"email": "testemail@gmail.com", "password": "wrongpassword"},
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertContains(
            response,
            text="Invalid username or password!!",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )
