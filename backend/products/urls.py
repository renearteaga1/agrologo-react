from django.urls import path

from . import views

urlpatterns = [
    path('', views.getProducts.as_view(), name='products'),
    path('create/',views.createProduct.as_view(), name='products-create'),
    path('delete/<str:pk>/', views.deleteProduct.as_view(), name='products-delete'),

    path('user/', views.getUserProducts.as_view(), name="products-user"),
    # path('user/<str:pk>/', views.getUserDetailsProduct.as_view(), name="products-user-details")
    path('user/<str:pk>/', views.updateProduct.as_view(), name="products-user-details"),

    path('categories/', views.ListCategories, name='categoies-list')
]