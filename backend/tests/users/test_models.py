import pytest


def test_user_str(base_user):
    """Test the string representation of a user."""
    assert str(base_user) == base_user.email


def test_base_user_is_not_student(base_user):
    """Test that a base user is not a student."""
    assert not base_user.is_student


def test_base_user_is_not_landlord(base_user):
    """Test that a base user is not a landlord."""
    assert not base_user.is_landlord


def test_base_user_is_not_admin(base_user):
    """Test that a base user is not an admin."""
    assert not base_user.is_admin


def test_student_user_is_student(student_user):
    """Test that a student user is a student."""
    assert student_user.is_student


def test_student_user_is_not_landlord(student_user):
    """Test that a student user is not a landlord."""
    assert not student_user.is_landlord


def test_student_user_is_not_admin(student_user):
    """Test that a student user is not an admin."""
    assert not student_user.is_admin


def test_landlord_user_is_not_student(landlord_user):
    """Test that a landlord user is not a student."""
    assert not landlord_user.is_student


def test_landlord_user_is_landlord(landlord_user):
    """Test that a landlord user is a landlord."""
    assert landlord_user.is_landlord


def test_landlord_user_is_not_admin(landlord_user):
    """Test that a landlord user is not an admin."""
    assert not landlord_user.is_admin


def test_admin_user_is_not_student(admin_user):
    """Test that an admin user is not a student."""
    assert not admin_user.is_student


def test_admin_user_is_not_landlord(admin_user):
    """Test that an admin user is not a landlord."""
    assert not admin_user.is_landlord


def test_admin_user_is_admin(admin_user):
    """Test that an admin user is an admin."""
    assert admin_user.is_admin
