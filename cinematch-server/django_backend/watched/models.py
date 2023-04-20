from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class watched(models.Model):
    movie_id = models.IntegerField(primary_key=True)
    movie_title = models.CharField(max_length=200, default='')
    rating = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )
    review = models.TextField(blank=True)

    def _str_(self):
        return "Movie ID: " + self.movie_id
