from rest_framework.test import APITestCase
from rest_framework import status


class TestBookingViews(APITestCase):
    """Test the booking views"""

    def test_get_bookings(self):
        """Test getting all bookings"""
        response = self.client.get("/api/bookings/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_booking(self):
        """Test getting a single booking that doesn't exist by id"""
        response = self.client.get("/api/bookings/1/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_create_booking(self):
        """Test creating a new booking"""
        self.client.post(
            "/api/auth/register/",
            data={
                "email": "testemail@gmail.com",
                "password": "testpassword",
                "password2": "testpassword",
                "first_name": "testfirst",
                "last_name": "testlast",
            },
        )
        data = {
            "room": 1,
            "start_date": "2023-06-01",
            "end_date": "2023-06-05",
        }
        self.client.login(email="testemail@gmail.com", password="testpassword")
        city = self.client.post("/api/cities/", {"name": "testcity"})
        response = self.client.post(
            "/api/properties/",
            {
                "name": "testtitle",
                "location": "testlocation",
                "street": "teststreet",
                "number": "2533",
                "city": city.data["url"],
            },
        )
        room = self.client.post(
            "/api/rooms/",
            {
                "property": response.data["url"],
                "name": "testname",
                "images": "https://example.com/image.jpg",
                "room_type": "dormitory",
                "num_beds": 6,
                "occupied_beds": 0,
                "price": 100,
                "description": "testdescription",
                "is_available": True,
            },
        )
        response = self.client.post(
            "/api/bookings/",
            data=data,
        )
        room = self.client.get(room.data["url"])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertContains(
            response, text="2023-06-01", status_code=status.HTTP_201_CREATED
        )
        assert room.data["occupied_beds"] == 1
        assert room.data["available_beds"] == 5
        assert room.data["is_available"]
