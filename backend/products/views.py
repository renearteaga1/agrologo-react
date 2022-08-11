from requests import request
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render


from rest_framework import generics, status, pagination
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.utils.urls import remove_query_param, replace_query_param

from .models import Product, Category, Price, Stock, Review, ProductImage
from .serializers import CategorySerializer, ProductSerializer, ProductImageSerializer, ProductCreateSerializer, SubCategory

# Create your views here.
class SmallResultsPagination(pagination.PageNumberPagination):
    page_size=1

    def get_page_number(self, request, paginator):
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages
            if int(page_number) > paginator.count:
                page_number = paginator.count
        return page_number

    def get_next_link(self):
        if not self.page.has_next():
            return None
        url = self.request.build_absolute_uri()
        page_number = self.page.next_page_number()
        return page_number

    def get_previous_link(self):
        if not self.page.has_previous():
            return None
        url = self.request.build_absolute_uri()
        page_number = self.page.previous_page_number()
        if page_number == 1:
            return 1
        return page_number

class ListCategories(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# @api_view(['GET'])
# def getProducts(request):
    
#     return Response({'details':'Get Products'})
class getProducts(generics.ListAPIView):
    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer
    # pagination_class = pagination.PageNumberPagination
    pagination_class = SmallResultsPagination

    def get_queryset(self):
        query = self.request.query_params.get('keyword')
        print('qiuery',query)
        subcategory = self.request.query_params.get('subcategoria')
        print('subcategoria,', subcategory)
        if query != None:
            products = Product.objects.filter(name__icontains=query, active=True)
        elif subcategory != None:
            subcategory_id = SubCategory.objects.filter(subCategory__icontains=subcategory)
            print(subcategory_id.last())
            products = Product.objects.filter(subCategory=subcategory_id.last(), active=True)
            print('products',products)
        else:
            products = Product.objects.filter(active=True)

        return products
        
class DetailsProduct(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = 'pk'
    queryset = Product.objects.filter(active=True)
        
    


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
        images = self.request.FILES.getlist('images')
        price = self.request.data.get('price')
        
        if images:
            self.request.data.pop('images')
            imagesFiles = {}
            i = 1
            for image in images:
                imagesFiles['image'+str(i)] = image
                i += 1
            print(imagesFiles)
        
        if serializer.is_valid():
            print('valid') 
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

    def get_serializer_class(self):
        if self.request.method == 'GET':           
            return ProductSerializer
        else:
            print('ppost')
            formData = self.request.data.copy()
            category = Category.objects.get(name=formData.get('category'))
            formData['category'] = category.id
            subCategory = SubCategory.objects.get(subCategory=formData.get('subCategory'))
            formData['subCategory'] = subCategory.id
            self.request.data = formData
            print(formData)
            return ProductCreateSerializer

    def perform_update(self, serializer):
        print('updating')
        print(self.request.data)
        

class SearchProduct(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        print('estoy buscando')
        print(self.kwargs['q'])
