from rest_framework import serializers
from .models import weatherData

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = weatherData
        fields = ('id', 'city', 'country', 'temperature', 'feels_like', 'temp_min', 'temp_max',
                  'pressure', 'humidity', 'wind_speed', 'wind_deg', 'cloudiness', 'visibility',
                  'weather_description', 'weather_icon', 'timestamp')