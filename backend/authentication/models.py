from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUser(AbstractBaseUser):
    email    = models.EmailField(unique=True)
    password = models.CharField(max_length=30)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
