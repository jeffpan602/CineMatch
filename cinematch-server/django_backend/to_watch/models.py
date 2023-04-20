from django.db import models

# Create your models here.


class to_watch(models.Model):
    movie_id = models.IntegerField(primary_key=True)
    movie_title = models.CharField(max_length=200, default='')
    completed = models.BooleanField(default=False)
