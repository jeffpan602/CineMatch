from django.shortcuts import render
from rest_framework import viewsets
from .serializers import to_watchSerializer
from .models import to_watch

# Create your views here.


class to_watchView(viewsets.ModelViewSet):
    serializer_class = to_watchSerializer
    queryset = to_watch.objects.all()
