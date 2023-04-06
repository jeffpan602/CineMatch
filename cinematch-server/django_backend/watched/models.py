from django.db import models

# Create your models here.


class watched(models.Model):
    movie_id = models.IntegerField(primary_key=True)
    rating = models.TextField()

    def _str_(self):
        return "Movie ID: " + self.movie_id
