from datetime import datetime
from operator import sub
from wsgiref import validate

from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Product, Category, Price, Stock, Review, ProductImage, SubCategory


class SubCategorySerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = SubCategory
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Category
        fields = '__all__'
        
    def get_subcategories(self, obj):
        subcategories = obj.subcategory_set.all()
        return SubCategorySerializer(subcategories, many=True).data

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # category = serializers.SerializerMethodField(read_only=True)
    # subCategory = serializers.SerializerMethodField(read_only=True)
    category = serializers.PrimaryKeyRelatedField(many=False,read_only=True)
    subCategory = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    price = serializers.SerializerMethodField(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    atCreated = serializers.SerializerMethodField(read_only=True)
    categories = serializers.SerializerMethodField(read_only=True)
    subCategories = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Product
        fields = "__all__"

    # def get_category(self, obj):
    #     category = obj.category
    #     print(category)
    #     return CategorySerializer(category, many=True).data
    
    # def get_subCategory(self, obj):
    #         subCategory = obj.subcategory
    #         return CategorySerializer(subCategory, many=True).data
    
    def get_categories(self, obj):
        categories = Category.objects.all()
        return CategorySerializer(categories, many=True).data
    
    def get_subCategories(self,obj):
        subcategories = SubCategory.objects.all()
        return SubCategorySerializer(subcategories, many=True).data

    def get_price(self,obj):
        price = obj.price_set.last()
        return PriceSerializer(price, many=False).data

    def get_image(self, obj):
        images = obj.productimage_set.last()
        return ProductImageSerializer(images, many=False).data

    def get_atCreated(self, obj):
        return obj.createdAt.strftime("%d-%b-%Y")



class ProductCreateSerializer(serializers.ModelSerializer):
    # images = serializers.FileField(max_length=None, allow_empty_file=False, use_url=False)
    # category = serializers.CharField(read_only=False)
    # subCategory = serializers.CharField(read_only=False)
    category = serializers.StringRelatedField(read_only=False)
    subCategory = serializers.StringRelatedField(read_only=False)

    class Meta:
        model = Product
        fields = '__all__'
        

    # def get_images(self, obj):
    #     images = obj.productimage_set.last()
    #     return ProductImageSerializer(images, many=False).data

    def create(self, validated_data):
        print('serializer def create')
        # price = validated_data.pop('price')
        category = validated_data.pop('category')
        category, createdCategory = Category.objects.get_or_create(name=category.capitalize())
        
        subCategory = validated_data.pop('subCategory')
        subCategory, createdSubCategory = SubCategory.objects.get_or_create(category=category, subCategory=subCategory.capitalize())

        product = validated_data
        print(product)
        product = Product.objects.create(category=category, subCategory=subCategory,**validated_data)
        print('product created')
        print(product.active)

    
        # for image in images:            
        #     imagesFiles['image'+str(i)] = image
        #     i = i + 1
        # print(images.type())
        # imageCreated = ProductImage.objects.create(product=product, **imagesFiles)
        
        return product
        # return super().create(validated_data)
        
    
    def update(self, instance, validated_data):
        print('updateing product')
        # category = validated_data.pop('category')
        # subCategory = validated_data.pop('subCategory')
        if instance.category != category:
            print('no es la misma')
            instance.category = Category.objects.get(name=category)
        if instance.subCategory != subCategory:
            print('no es la misma subcategory')
            instance.subCategory = SubCategory.objects.get(subCategory=subCategory)
        for attr, value in validated_data.items():            
            setattr(instance, attr, value)

        instance.save()
        return instance

        