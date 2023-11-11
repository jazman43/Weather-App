from django.urls import path
from .views import WeatherView, RainRadarWeather


urlpatterns = [
    path('weather/', WeatherView.as_view(), name="weather"),
    path('rainRadar/', RainRadarWeather.as_view(), name="rainRadar"),
]