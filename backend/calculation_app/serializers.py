from rest_framework import serializers
from .models import AppDataModel, OutputPageModel

class AppDataSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
     
    class Meta:
        model = AppDataModel
        fields = "__all__"

    def get_photo_url(self, caphoter):
        request = self.context.get('request', None)
        photo_url = caphoter.image.url
        if request is not None:
            return request.build_absolute_uri(photo_url)


class OutputPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutputPageModel
        fields = "__all__"
