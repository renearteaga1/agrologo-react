from datetime import datetime

from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Product, Category, Price, Stock, Review, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField(read_only=True)
    price = serializers.SerializerMethodField(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'

    def get_category(self, obj):
        category = obj.category_set.all()
        return CategorySerializer(category, many=True).data
    
    def get_price(self,obj):
        price = obj.price_set.last()
        return PriceSerializer(price, many=False).data

    def get_image(self, obj):
        images = obj.productimage_set.last()
        return ProductImageSerializer(images, many=False).data