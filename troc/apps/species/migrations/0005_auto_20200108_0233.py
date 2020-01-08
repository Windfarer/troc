# Generated by Django 3.0 on 2020-01-08 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('species', '0004_auto_20200103_1125'),
    ]

    operations = [
        migrations.AddField(
            model_name='species',
            name='subspecies',
            field=models.CharField(max_length=200, null=True, verbose_name='亚种'),
        ),
        migrations.AddField(
            model_name='species',
            name='subspecies_cn',
            field=models.CharField(max_length=200, null=True, verbose_name='亚种-中文'),
        ),
    ]
