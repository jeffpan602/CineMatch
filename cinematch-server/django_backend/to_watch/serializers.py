from rest_framework import serializers
from .models import to_watch


class to_watchSerializer(serializers.ModelSerializer):
    class Meta:
        model = to_watch
        fields = ('movie_id', 'movie_title', 'completed')
