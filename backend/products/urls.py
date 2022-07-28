from django.urls import path

from . import views

urlpatterns = [
    path('', views.getProducts.as_view(), name='products'),
    
]