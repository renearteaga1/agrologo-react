# Generated by Django 3.2 on 2022-08-04 02:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0010_remove_category_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='subCategory',
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.category'),
        ),
    ]