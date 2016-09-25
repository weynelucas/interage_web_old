# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-09-24 11:48
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('drug', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DrugInteractionChecker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, help_text='Title (Optional)', max_length=150, null=True)),
                ('description', models.CharField(blank=True, help_text='Description (Optional)', max_length=500, null=True)),
                ('uses', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('selected_drugs', models.ManyToManyField(to='drug.Drug')),
            ],
            options={
                'verbose_name': 'drug interaction',
            },
        ),
    ]
