import pytest
from rest_framework.test import APIRequestFactory
from core.permissions import IsOwnerOrReadOnly

factory = APIRequestFactory()


@pytest.mark.django_db
def test_is_owner_or_readonly_read_permission_on_get(base_user):
    """Test the IsOwnerOrReadOnly permission."""
    request = factory.get("/notes/", {"title": "new idea"})

    assert (
        IsOwnerOrReadOnly.has_object_permission(
            IsOwnerOrReadOnly, request=request, view=None, obj=base_user
        )
        is True
    )


@pytest.mark.django_db
def test_is_owner_or_readonly_write_permission(property_factory, base_user):
    """Test the IsOwnerOrReadOnly permission."""
    request = factory.post("/notes/", {"title": "new idea"})
    request.user = base_user
    assert (
        IsOwnerOrReadOnly.has_object_permission(
            IsOwnerOrReadOnly,
            request=request,
            view=None,
            obj=property_factory(owner=base_user),
        )
        is True
    )


@pytest.mark.django_db
def test_is_owner_or_readonly_write_permission_different_user(
    property_factory, base_user
):
    """Test the IsOwnerOrReadOnly permission."""
    request = factory.post("/notes/", {"title": "new idea"})
    request.user = base_user
    assert (
        IsOwnerOrReadOnly.has_object_permission(
            IsOwnerOrReadOnly,
            request=request,
            view=None,
            obj=property_factory(),
        )
        is False
    )
