from django.urls import path
from .views import WeatherView, RainRadarWeather, WeatherWarnings

#conneting backend with frontend
urlpatterns = [
    path('weather/', WeatherView.as_view(), name="weather"),
    path('RainRadarWeather/', RainRadarWeather.as_view(), name="RainRadarWeather"),
    path('WeatherWarnings/', WeatherWarnings.as_view(), name="WeatherWarnings"),
]