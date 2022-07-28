from datetime import datetime

from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Product, Category, Price, Stock, Review, ProductImage

class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'