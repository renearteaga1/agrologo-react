# Generated by Django 3.2 on 2022-07-30 00:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_auto_20220730_0030'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='codigo',
            field=models.CharField(blank=True, max_length=90, null=True),
        ),
    ]
