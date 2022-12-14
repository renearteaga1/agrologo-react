import random
import os
from statistics import mode

from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

# Create your models here.
def get_filename_ext(filepath):
    base_name = os.path.basename(filepath)
    name, ext = os.path.splitext(base_name)
    return name, ext

def upload_image_path(instance, filename):
    new_filename = random.randint(1, 3920540249)
    name, ext = get_filename_ext(filename)
    final_filename = '{new_filename}{ext}'.format(new_filename=new_filename, ext=ext)
    return "productos/{final_filename}".format(
            filename=filename,
            final_filename=filename
            )
    



class Category(models.Model):
    # product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=110)    
    grupo_id = models.CharField(max_length=9, blank=True)
    # subCategory = models.CharField(max_length=90, blank=True, null=True)
    # SubCategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True)
    info = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    subCategory = models.CharField(max_length=110)

    def __str__(self):
        return self.subCategory

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    subCategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=70)   
    codigo = models.CharField(max_length=90, blank=True, null=True)
    brand = models.CharField(max_length=70, null=True, blank=True)  
    productor = models.CharField(max_length=70, blank=True, null=True)
    cantidad = models.DecimalField(max_digits=5, decimal_places=1, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    edad = models.DecimalField(blank=True, null=True, max_digits=4, decimal_places=1)
    peso = models.DecimalField(blank=True, null=True, max_digits=6, decimal_places=1)
    sexo = models.CharField(max_length=9, blank=True, null=True)
    raza = models.CharField(max_length=90, blank=True, null=True)
    pesoMin = models.DecimalField(blank=True, null=True, max_digits=6, decimal_places=1)
    pesoMax = models.DecimalField(blank=True, null=True, max_digits=6, decimal_places=1)
    pesoAvg = models.DecimalField(blank=True, null=True, max_digits=6, decimal_places=1)
    rating =models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)    
    countInStock = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True, default=0)
    slug = models.SlugField(max_length=96, blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return str(self.name)

    def save(self, **kwargs):
        slug_str = "%s %s" % (self.name.lower(), self.id)
        self.slug = slug_str.replace(' ', "-")
        #unique_slugify(self, slug_str)
        super(Product, self).save(**kwargs)
    
# class Category(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#     category = models.CharField(max_length=110)    
#     grupo_id = models.CharField(max_length=9, blank=True)
#     subCategory = models.CharField(max_length=90, blank=True, null=True)
#     info = models.CharField(max_length=250, blank=True, null=True)

#     def __str__(self):
#         return self.category


    
class Price(models.Model):
     product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
     costo = models.DecimalField(max_digits=12, decimal_places=5, blank=True, null=True)
     iva = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
     precioSinIva = models.DecimalField(max_digits=12, decimal_places=5, blank=True, null=True)
     precioTotal = models.DecimalField(max_digits=12, decimal_places=2)
     ivaValor = models.DecimalField(max_digits=12, decimal_places=5, blank=True, null=True)
     createcreatedAt = models.DateTimeField(auto_now_add=True)
     
     def __str__(self):
            return self.product.name
        
class Stock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    stock = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    createcreatedAt = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
            return self.product.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.product.name    
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    image1 = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    image2 = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    image3 = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    image4 = models.ImageField(upload_to=upload_image_path, null=True, blank=True)
    image5 = models.ImageField(upload_to=upload_image_path, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'producto imagenes'
    def __str__(self):
        return self.product.name