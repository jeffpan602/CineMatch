# Generated by Django 4.2 on 2023-04-20 02:08

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('watched', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='watched',
            name='rating',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)]),
        ),
        migrations.AlterField(
            model_name='watched',
            name='review',
            field=models.TextField(blank=True),
        ),
    ]
