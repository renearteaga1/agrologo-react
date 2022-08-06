from django.contrib.auth.models import User
from django.shortcuts import render
from requests import request

from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import Product, Category, Price, Stock, Review, ProductImage
from .serializers import CategorySerializer, ProductSerializer, ProductImageSerializer, ProductCreateSerializer, SubCategory

# Create your views here.
class ListCategories(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# @api_view(['GET'])
# def getProducts(request):
    
#     return Response({'details':'Get Products'})
class getProducts(generics.ListAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer

    # def list(self,request):
    #     serializer = ProductSerializer(self.get_queryset(), many=True)
    #     serializer_img = ProductImageSerializer(ProductImage.objects.last(),many=False)
    #     return Response(serializer.data)


# class createProduct(generics.CreateAPIView):
#     serializer_class = ProductSerializer
    
#     def perform_create(self, serializer):
#         print(serializer.data)

class getUserProducts(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(user=user, active=True)

class getUserDetailsProduct(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    # queryset = Product.objects.get.all()

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(user=self.request.user, active=True)

class createProduct(generics.CreateAPIView):
    serializer_class = ProductCreateSerializer
    permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #     user = self.request.user
    #     return Product.objects.filter(user=user)


    def perform_create(self,serializer):
        print('performing create')
        print(self.request.data)
        
        
        images = self.request.FILES.getlist('images')
        price = self.request.data.get('price')
        
        if images:
            print('llego aqui?')
           
            self.request.data.pop('images')
            print('si hay imagehe')
            imagesFiles = {}
            i = 1
            for image in images:
                imagesFiles['image'+str(i)] = image
                i += 1
            print(imagesFiles)
        
        if serializer.is_valid():
            print('valid')
            # print(self.request.data['images'])
           
           
            product = serializer.save(user=self.request.user)
            if images:
                ProductImage.objects.create(product=product, **imagesFiles)
            print('images created')
            print(float(price))
            Price.objects.create(product=product,precioTotal=float(price))
            print('Price created')
            # return ProductSerializer(product)
        else:
            print('novalid')
        

class deleteProduct(generics.UpdateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        user = self.request.user
        print('lleaga aqui')
        return Product.objects.filter(user=self.request.user, active=True)
    
    def perform_update(self, serializer):
        print('updating')
        serializer.save(active=False)

class updateProduct(generics.RetrieveUpdateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = ProductCreateSerializer
    lookup_field = 'pk'

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter( active=True)

    # def get_serializer_class(self):
    #     if self.request.method == 'GET':           
    #         return ProductSerializer
    #     else:
    #         print('ppost')
    #         formData = self.request.data.copy()
    #         category = Category.objects.get(name=formData.get('category'))
    #         formData['category'] = category.id
    #         subCategory = SubCategory.objects.get(subCategory=formData.get('subCategory'))
    #         formData['subCategory'] = subCategory.id
    #         self.request.data = formData
    #         print(formData)
    #         return ProductCreateSerializer

    def perform_update(self, serializer):
        print('updating')
        print(self.request.data)
        # category = self.request.data.get('category')
        # subCategory = self.request.data.get('subCategory')
        # price = self.request.data.get('price')
        # print('aquiget price')
        
        # product = serializer.save()
        # print('grabo')
        # category = Category.objects.get(name=category)
        # subCategory = SubCategory.objects.get(subCategory=category)
        # product.category = category
        