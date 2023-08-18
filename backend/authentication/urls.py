from django.urls import path
from .views import  UserRegisterView, UserLoginView, UserView, UserLogoutView

urlpatterns = [
    path('register', UserRegisterView.as_view(), name='user-register'),
    path('login',    UserLoginView.as_view(),    name='user-login'),
    path('logout',   UserLogoutView.as_view(),   name='user-logout'),
    path('user',     UserView.as_view(),         name='user')
]