from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import RainRadarData
from .serializers import RainRadarDataSerializer

# Create your views here.


class RainRadarDataList(generics.ListCreateAPIView):
    queryset = RainRadarData.objects.all()
    serializer_class = RainRadarDataSerializer
    parser_classes = (MultiPartParser, FormParser)

class RainRadarDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RainRadarData.objects.all()
    serializer_class = RainRadarDataSerializer