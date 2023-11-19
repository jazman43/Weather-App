from rest_framework import serializers
from .models import weatherData, weatherWarningData

class WeatherSerializer(serializers.ModelSerializer):

    weather_icon_url = serializers.SerializerMethodField()

    class Meta:
        model = weatherData
        fields = ('id', 'city', 'country', 'temperature', 'feels_like', 'temp_min', 'temp_max',
                  'pressure', 'humidity', 'wind_speed', 'wind_deg', 'cloudiness', 'visibility',
                  'weather_description', 'weather_icon', 'timestamp', 'weather_icon_url')
        

        #get icon image 
    def get_weather_icon_url(self,obj):
            icon_code =obj.weather_icon
            return f'https://openweathermap.org/img/wn/{icon_code}@2x.png'

        


class WeatherWarningSerializer(serializers.ModelSerializer):
    class Meta:
        model = weatherWarningData
        fields = ('city', 'country', 'alerts_event', 'alerts_description')

