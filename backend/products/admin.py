from django.contrib import admin

from .models import Product, Category, Price, Stock, Review, ProductImage

# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Price)
admin.site.register(Stock)
admin.site.register(Review)
admin.site.register(ProductImage)