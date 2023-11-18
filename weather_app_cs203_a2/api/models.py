from django.db import models





# Create your models here.
##
class weatherData(models.Model):
   city = models.CharField(max_length=255)
   country = models.CharField(max_length=255)
   temperature = models.FloatField()
   feels_like = models.FloatField()
   temp_min = models.FloatField()
   temp_max = models.FloatField()
   pressure = models.IntegerField()
   humidity = models.IntegerField()
   wind_speed = models.FloatField()
   wind_deg = models.IntegerField()
   cloudiness = models.IntegerField()
   visibility = models.IntegerField()
   weather_description = models.CharField(max_length=255)
   weather_icon = models.CharField(max_length=10)
   timestamp = models.DateTimeField(auto_now_add=True)


class weatherWarningData(models.Model):
   city = models.CharField(max_length=255)
   country = models.CharField(max_length=255)
   alerts_event = models.CharField(max_length=255)
   alerts_description = models.CharField(max_length=255)