from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.


class watched(models.Model):
    movie_id = models.IntegerField(primary_key=True)
    rating = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10)
        ]
    )
    review = models.TextField()

    def __str__(self):
        return f"Movie ID: {self.movie_id}"
