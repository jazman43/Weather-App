from rest_framework import serializers
from .models import RainRadarData

class RainRadarDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RainRadarData
        fields = '__all__'