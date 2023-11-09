import datetime

import requests 

from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import RainRadarData
from .serializers import RainRadarDataSerializer

# Create your views here.
def index(request):
    API_KEY = '6cd8596a9e075cc1718aeee820c8d1fa'#open("API_KEY", "r").read()
    current_weather_url = "https://api.openweathermap.org/data/2.5/weather?q={}&appid={}"
    forcast_url = "https://api.openweathermap.org/data/2.5/onecall?lat={}&lon={}&exclude=current,minutely,hourly,alerts&appid{}"

    if request.method == "POST":
        city1 = request.POST['city1']
    else:
        return render(request , "")



def fetch_weather_and_forecast(city, api_key, current_weather_url, forecast_url):

    response = requests.get(current_weather_url.format(city, api_key)).json()

    lat, lon = response['coord']['lat'], response['coord']['lon']

    forecast_response = requests.get(forecast_url.format(lat, lon, api_key)).json()

    weather_data = {
        "city": city,
        
    }






class RainRadarDataList(generics.ListCreateAPIView):
    queryset = RainRadarData.objects.all()
    serializer_class = RainRadarDataSerializer
    parser_classes = (MultiPartParser, FormParser)

class RainRadarDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RainRadarData.objects.all()
    serializer_class = RainRadarDataSerializer