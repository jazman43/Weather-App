import datetime

import requests 

from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import RainRadarDataSerializer

# Create your views here.


class WeatherView(APIView):
    def get(self, request, format=None):
        city = request.GET.get('city')
        country = request.GET.get('country')
        api_key = '6cd8596a9e075cc1718aeee820c8d1fa'

        

        if  city and country:       

            url = f'https://api.openweathermap.org/data/2.5/weather?q={city},{country}&appid={api_key}&units=metric'

            print(city)
            try:
                response = requests.get(url)
                response.raise_for_status()
                data = response.json()

                print(data)
                return Response(data, status=status.HTTP_200_OK)
            except requests.RequestException as e:
                print(f"Error fetching weather data: {e}")
                return Response({'error' : f'error fetching weather data: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

        else:
            return Response({'error': 'City and country praamesters are required'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)