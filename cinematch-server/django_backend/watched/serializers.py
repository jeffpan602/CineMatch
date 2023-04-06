from rest_framework import serializers
from .models import watched


class watchedSerializer(serializers.ModelSerializer):
    class Meta:
        model = watched
        fields = ('movie_id', 'rating', 'review')
