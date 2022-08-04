from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, UserSerializer, UserSerializerWithToken, RegisterSerializerWithToken


# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):    
    serializer = RegisterSerializerWithToken(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(UserSerializerWithToken(user, many=False).data)
    else:
        print(serializer.errors)
        return Response({'detail':'Usuario con ese correo ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    if not request.data['password']:
        instance_data = request.data
        instance_data['password'] = user.password
   
    serializer = UserSerializerWithToken(user, data=instance_data, partial=True)
    if serializer.is_valid():
          
        user = serializer.save()
        return Response(serializer.data)
    else:
        
        return Response({'detail':'Datos no válidos'}, status=status.HTTP_400_BAD_REQUEST)        