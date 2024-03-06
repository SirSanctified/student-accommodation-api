import pytest


@pytest.mark.django_db
def test_create_base_user_with_email_successful(user_factory):
    """Test creating a new user with an email is successful."""
    email = "testemail@gmail.com"
    password = "testpassword"
    user = user_factory.create(email=email, password=password)
    assert user.email == email


@pytest.mark.django_db
def test_new_user_email_normalized(user_factory):
    """Test the email for a new user is normalized."""
    email = "TesTEmail@gnail.com"
    password = "testpassword"
    user = user_factory.create(email=email, password=password)
    assert user.email == email.lower()


@pytest.mark.django_db
def test_new_user_invalid_email(user_factory):
    """Test creating user with no email raises error."""
    with pytest.raises(ValueError):
        user_factory.create(email=None)


@pytest.mark.django_db
def test_create_new_superuser(user_factory):
    """Test creating a new superuser."""
    email = "testemail@gmail.com"
    password = "testpassword"
    user = user_factory.create(email=email, password=password, is_superuser=True)
    assert user.is_superuser


@pytest.mark.django_db
def test_create_new_landlord(user_factory):
    """Test creating a new landlord."""
    email = "testemail@gmail.com"
    password = "testpassword"
    user = user_factory.create(email=email, password=password, is_landlord=True)
    assert user.is_landlord


@pytest.mark.django_db
def test_create_new_student(user_factory):
    """Test creating a new student."""
    email = "testemail@gmail.com"
    password = "testpassword"
    user = user_factory.create(email=email, password=password, is_student=True)
    assert user.is_student


@pytest.mark.django_db
def test_create_new_user(user_factory):
    """Test creating a new user."""
    email = "testemail@gmail.com"
    password = "testpassword"
    user = user_factory.create(email=email, password=password)
    assert user.is_active
    assert not user.is_superuser
    assert not user.is_landlord
    assert not user.is_student
    assert not user.is_admin
