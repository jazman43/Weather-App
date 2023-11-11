import datetime

import requests 

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from django.views import View
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import WeatherSerializer
from .models import weatherData
# Create your views here.

api_key = '6cd8596a9e075cc1718aeee820c8d1fa'

#get info from the api here main weather
class WeatherView(APIView):
    serilizer = WeatherSerializer


    def get(self, request, format=None):
        city = request.GET.get('city')
        country = request.GET.get('country')
        
        #city = 'Hamilton'
        #country = 'NZ'        
        

        
        print(city)
        if  city and country:       

            url = f'https://api.openweathermap.org/data/2.5/weather?q={city},{country}&appid={api_key}&units=metric'

            
            try:
                response = requests.get(url)
                response.raise_for_status()
                data = response.json()


                weather_instance, created = weatherData.objects.update_or_create(
                city=data['name'],
                country=data['sys']['country'],
                defaults={
                    'temperature': data['main']['temp'],
                    'feels_like': data['main']['feels_like'],
                    'temp_min': data['main']['temp_min'],
                    'temp_max': data['main']['temp_max'],
                    'pressure': data['main']['pressure'],
                    'humidity': data['main']['humidity'],
                    'wind_speed': data['wind']['speed'],
                    'wind_deg': data['wind']['deg'],
                    'cloudiness': data['clouds']['all'],
                    'visibility': data['visibility'],
                    'weather_description': data['weather'][0]['description'],
                    'weather_icon': data['weather'][0]['icon'],
                }
            )

            # Serialize the data
                serializer = WeatherSerializer(weather_instance)
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except requests.RequestException as e:
                print(f"Error fetching weather data: {e}")
                return Response({'error' : f'error fetching weather data: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

        else:
            return Response({'error': 'City and country praamesters are required'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        



#get info from the api here Rain radar weather
class RainRadarWeather(APIView):
    serilizer = WeatherSerializer

    def get(self, request, fromat=None):
        
        zoom = 7
        x = 12
        y = 34

        layer = 'precipitation_new'

        if x and y:
            url = f'https://api.openweathermap.org/map/{layer}/{zoom}/{x}/{y}.png?appid={api_key}'

            try:
                response = requests.get(url)
                response.raise_for_status()
                data = response.json()

                if response.headers['Content-Type'] == 'image/png':
                    # Return the image directly
                    print("image sent")
                    return HttpResponse(response.content, content_type='image/png')
                    
                else:
                    return Response({'error': 'Unexpected response format'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

            
            except requests.RequestException as e:
                print(f"Error fetching weather data: {e}")
                return Response({'error' : f'error fetching weather data: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

        else:
            return Response({'error': 'City and country praamesters are required'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



