from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static

from .views import  AppDataModelDetail, OutputPageModelDetail

urlpatterns = [
    path('configinput',  AppDataModelDetail.as_view(),     name='input-config'),
    path('configoutput', OutputPageModelDetail.as_view(),  name='output-config')
]
