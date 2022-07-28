from django.shortcuts import render

from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, Category, Price, Stock, Review, ProductImage
from .serializers import ProductSerializer

# Create your views here.
# @api_view(['GET'])
# def getProducts(request):
    
#     return Response({'details':'Get Products'})
class getProducts(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    

class createProduct(generics.CreateAPIView):
    serializer_class = ProductSerializer
    
    def perform_create(self, serializer):
        print(serializer.data)
        