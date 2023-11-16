import datetime

import requests 
import math
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

from django.views import View
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import WeatherSerializer
from .models import weatherData

from PIL import Image
from io import BytesIO




# Create your views here.

api_key = '6cd8596a9e075cc1718aeee820c8d1fa'
google_maps_api_key = 'AIzaSyCHsGUAf2vn5u069fcXLT4NB088yhymcSE'

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
        





def overlay_images(background_bytes, overlay_bytes , x_coord, y_coord):
    background = Image.open(BytesIO(background_bytes))
    overlay = Image.open(BytesIO(overlay_bytes))

    target_width = 640  # Adjust as needed
    target_height = 480  # Adjust as needed
    overlay = overlay.resize((target_width, target_height))

    

   # Calculate adjusted coordinates for the overlay
    x_position = x_coord
    y_position = y_coord
    background.paste(overlay, (x_position, y_position), overlay)
    
    result_image = BytesIO()
    background.save(result_image, format='PNG')
    
    return result_image.getvalue()



TILE_SIZE = 15
zoom_radar = 5
zoom_google = 5

def calculate_world_coordinate(latLng):
    scale = 1 << zoom_google
    world_coordinate = project(latLng)
    pixel_coordinate = (
        int(world_coordinate[0] * scale),
        int(world_coordinate[1] * scale),
    )
    tile_coordinate = (
        int((world_coordinate[0] * scale) / TILE_SIZE),
        int((world_coordinate[1] * scale) / TILE_SIZE),
    )
    return world_coordinate, pixel_coordinate, tile_coordinate


def project(latLng):
    siny = math.sin((latLng[0] * math.pi) / 180)

    # Truncating to 0.9999 effectively limits latitude to 89.189. This is
    # about a third of a tile past the edge of the world tile.
    siny = min(max(siny, -0.9999), 0.9999)
    return (
        TILE_SIZE * (0.5 + latLng[1] / 360),
        TILE_SIZE * (0.5 - math.log((1 + siny) / (1 - siny)) / (4 * math.pi)),
    )







#get info from the api here Rain radar weather
class RainRadarWeather(APIView):
    serilizer = WeatherSerializer

    def get(self, request, fromat=None):
        city = request.GET.get('city')
        country = request.GET.get('country')
        
        
        

        layer = 'precipitation_new'

        if city and country:
           

            try:
                weather_url = f'https://api.openweathermap.org/data/2.5/weather?q={city},{country}&appid={api_key}&units=metric'

                weather_response = requests.get(weather_url)
                weather_response.raise_for_status()
                weather_data = weather_response.json()

                #this is for the google maps 
                lat = weather_data['coord']['lat']
                lon = weather_data['coord']['lon']
                
                weather_instance, created = weatherData.objects.update_or_create(
                city=weather_data['name'],
                country=weather_data['sys']['country'],
                )


                #this is for our radar image (0,0 top left corner)
                world_coord, pixel_coord, tile_coord = calculate_world_coordinate((lat, lon))
                print(pixel_coord)
                print(tile_coord)
                tile_x_coord = tile_coord[0]
                tile_y_coord = tile_coord[1]


                google_maps_url = f'https://maps.googleapis.com/maps/api/staticmap?center={lat},{lon}&zoom={zoom_google}&size=640x480&maptype=roadmap&key={google_maps_api_key}'
                google_maps_response = requests.get(google_maps_url)
                google_maps_response.raise_for_status()

                #how can we get our new x and y to line up?
                #x coord overlay image left/right first number y coord over lay image up down
                radar_url = f'https://tile.openweathermap.org/map/{layer}/{zoom_radar}/{tile_x_coord}/{tile_y_coord}.png?appid={api_key}'


                response = requests.get(radar_url)
                response.raise_for_status()
                
                

                combined_image = overlay_images(
                    google_maps_response.content, response.content, tile_x_coord, tile_y_coord
                )
                 
                return HttpResponse(combined_image, content_type=response.headers['content-type'])
                   

            
            except requests.RequestException as e:
                print(f"Error fetching weather data: {e}")
                return Response({'error' : f'error fetching weather data: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

        else:
            return Response({'error': 'City and country praamesters are required'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        



