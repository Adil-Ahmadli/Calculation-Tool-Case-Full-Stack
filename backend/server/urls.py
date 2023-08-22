from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view


urlpatterns = [
    path("admin/",    admin.site.urls),
    path("auth/",     include("authentication.urls")),
    path("app/",      include("calculation_app.urls")),
    path('openapi', get_schema_view(
        title="Your Project",
        description="API for all things …",
        version="1.0.0",
        public=True,
    ), name='openapi-schema'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns = format_suffix_patterns(urlpatterns)
