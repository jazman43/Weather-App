
from django.urls import path
from .views import index

urlpatterns = [
    
    path('', index),
    path('rain-radar', index),
    path('main-weather', index)
]
