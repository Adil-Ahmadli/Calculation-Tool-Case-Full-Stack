from django.db import models

class AppDataModel(models.Model):
    image               =   models.ImageField()
    title               =   models.CharField(max_length=100)
    description         =   models.TextField()
    countOfVariables    =   models.IntegerField()
    variables           =   models.JSONField()
    formula             =   models.TextField()
    
class OutputPageModel(models.Model):
    image               =   models.ImageField()
    title               =   models.CharField(max_length=100)
    description         =   models.TextField()
    countOfVariables    =   models.IntegerField()
    variables           =   models.JSONField()