# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, verbose_name='\u59d3\u540d')),
                ('grade', models.CharField(max_length=5, verbose_name='\u5e74\u7ea7')),
                ('department', models.CharField(max_length=40, verbose_name='\u4e13\u4e1a')),
                ('tel', models.CharField(max_length=11, verbose_name='\u624b\u673a\u53f7')),
                ('mail', models.CharField(max_length=40, verbose_name='\u90ae\u7bb1')),
                ('resume', models.TextField(verbose_name='\u7b80\u5386')),
            ],
            options={
                'verbose_name': '\u62a5\u540d\u9009\u624b\u7c7b',
                'verbose_name_plural': '\u62a5\u540d\u9009\u624b\u7c7b',
            },
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40, verbose_name='\u961f\u540d')),
                ('product', models.CharField(max_length=40, verbose_name='\u4f5c\u54c1\u540d\u79f0')),
                ('votes', models.IntegerField(default=0, verbose_name='\u7968\u6570')),
            ],
            options={
                'verbose_name': '\u961f\u4f0d\u7c7b',
                'verbose_name_plural': '\u961f\u4f0d\u7c7b',
            },
        ),
    ]
