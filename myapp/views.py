from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate,logout
from django.contrib.auth.models import User
from .serializers import UserSerializer, RegisterSerializer

@api_view(['POST'])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    serializer = RegisterSerializer(data = {"username": username, "password": password})
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=201)
    return Response(serializer.errors)

@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": UserSerializer(user).data
        })
    return Response({"error": "Invalid credentials"})

@api_view(['POST'])
def logout_view(request):
    if not request.user.is_authenticated:
        return Response({"message": "You are not permitted to access here"}, status = 400)
    logout(request)
    print(request.user)
    return Response({"message": "successfully logged out"}, status = 200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    return Response(UserSerializer(request.user).data)
