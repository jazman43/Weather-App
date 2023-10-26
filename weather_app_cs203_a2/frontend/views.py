from django.shortcuts import render


# Create your views here.

def index(request, *args, **kwargs):
    """API_KEY = open("API_KEY", "r").read()"""
    return render(request, 'frontend/index.html')