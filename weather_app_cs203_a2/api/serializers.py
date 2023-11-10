from rest_framework import serializers
#from .models import weatherData

class RainRadarDataSerializer(serializers.ModelSerializer):
    class Meta:
        #model = weatherData
        fields = ()




class MainWeatherSerializer(serializers.ModelSerializer):
    class Meta:
        #model = weatherData
        fields =()