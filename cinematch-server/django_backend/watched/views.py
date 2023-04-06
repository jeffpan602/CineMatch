from django.shortcuts import render
from rest_framework import viewsets
from .serializers import watchedSerializer
from .models import watched

# Create your views here.


class watchedView(viewsets.ModelViewSet):
    serializer_class = watchedSerializer
    queryset = watched.objects.all()
