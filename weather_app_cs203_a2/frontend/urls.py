
from django.urls import path
from .views import index

urlpatterns = [
    
    path('', index),
    path('rain-radar', index),
    path('main-weather', index),
    path('weather-warings', index),
    path('laundry-forcast', index),
    path('ideal-finishing', index),
    path('fire-danger', index),
    path('bbq-forcast', index)
]


