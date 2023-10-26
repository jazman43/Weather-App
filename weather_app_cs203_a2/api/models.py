from django.db import models





# Create your models here.



class RainRadarData(models.Model):
    timestamp = models.DateTimeField()
    location = models.CharField(max_length=255)
    radar_image = models.ImageField(upload_to='radar_images/')

