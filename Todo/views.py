from django.shortcuts import render
from rest_framework import viewsets
from .models import Todo
from .serializers import *

# Create your views here.

class TodoViewSet(viewsets.ModelViewSet):
    print('///////////////////')
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer




